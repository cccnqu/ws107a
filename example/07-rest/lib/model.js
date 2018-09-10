const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const M = module.exports = {}

M.init = async function (url='mongodb://localhost:27017') {
  M.client = await MongoClient.connect(url)
  M.db = await M.client.db('koablog')
  M.posts = M.db.collection('posts')
}

M.close = async function () {
  return M.client.close()
}

M.selectPosts = async function (q) {
  let result = await M.posts.find(q)
  let posts = result.toArray()
  return posts
}

M.insertPost = async function (post) {
  let result = await M.posts.insert(post)
  return result
}
