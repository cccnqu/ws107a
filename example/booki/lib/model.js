const path = require('path')
const io = require('./io')
const MD = require('mdo')
var M = module.exports = {}

M.init = async function (root) {
  M.bookRoot = path.join(root, 'book')
  M.settingFile = path.join(root, 'setting/setting.mdo')
  var settingMdo = await io.readFile(M.settingFile)
  M.setting = MD.parseMdo(settingMdo)
  M.setting.users = MD.index(M.setting.users, 'user')
  M.users = M.setting.users
}

M.close = async function () {
}

M.getBookPath = function (book) {
  return path.join(M.bookRoot, book)
}

M.getFilePath = function (book, file) {
  return path.join(M.getBookPath(book), file)
}

M.getBook = async function (book) {
  var bookFile = path.join(M.getBookPath(book), 'book.mdo')
  var bookMdo = await io.readFile(bookFile)
  var bookObj = MD.parseMdo(bookMdo)
  bookObj.book = book
  return bookObj
}

M.getBookFile = async function (book, file) {
  var filePath = M.getFilePath(book, file)
  var hasFile = await io.fileExists(filePath)
  if (hasFile) {
    var fileObj = { book: book, file: file }
    fileObj.text = await io.readFile(filePath)
    return fileObj
  }
}

M.saveBookFile = async function (book, file, text) {
  var path = book + '/' + file
  var filePath = M.getFilePath(book, file)
  await io.writeFile(filePath, text)
}

M.createBook = async function (book, user) {
  console.log('createBook:%s', book)
  await io.mkdir(M.getBookPath(book))
  await io.writeFile(M.getBookPath(book) + '/book.mdo',
    'title:Book Title\neditor:' + user + '\nchapters:\ntitle        | link\n-------------|---------\nREADME       | README.md\nChapter1     | chapter1.md')
}
