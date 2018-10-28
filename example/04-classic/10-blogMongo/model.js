const mongodb = require('mongodb')

const M = module.exports = {}

M.init = async function () {
  M.client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/')
  M.db = M.client.db('blogmvc')
  M.boards = M.db.collection('boards')
  M.posts = M.db.collection('posts')
  M.profiles = M.db.collection('profiles')
  M.boards.createIndex({ board: 1 })
  M.posts.createIndex({ board: 1, user: 1, file: 1 })
  M.profiles.createIndex({ user: 1 })
}

M.close = async function () {
  await M.client.close()
}

M.listBoards = async function () {
  let boards = await M.boards.find({}).toArray()
  return boards
}

M.login = async function (user, password) {
  let profile = await M.profiles.findOne({user: user})
  return (profile.password === password)
}

M.signup = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  return profile == null
}

M.addUser = async function (passport) {
  await M.profiles.insertOne(passport)
  await M.boards.insertOne({board: passport.user})
}

M.getProfile = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  return profile
}

M.saveProfile = async function (profile) {
  await M.profiles.updateOne({user: profile.user}, {$set: profile}, { upsert: false })
}

M.boardPosts = async function (board) {
  const posts = await M.posts.find({board: board}).sort({created_at: -1}).toArray()
  return posts
}

M.addPost = async function (user, board, post) {
  if (user == null) return false
  if (post.file == null) throw Error('addPost: file == null')
  post.user = user
  post.board = board
  post.created_at = new Date()
  let result = await M.posts.insertOne(post)
  console.log('addPost: result.insertedId=', result.insertedId)
  return result.insertedId != null
}

M.getPost = async function (board, file) {
  let post = await M.posts.findOne({board: board, file: file})
  return post
}
