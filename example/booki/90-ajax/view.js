var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')

handlebars.registerHelper({
  eq: function (v1, v2) {
    return v1 === v2
  }
})

var V = module.exports = {}

V.init = function (root) {
  V.viewPath = path.join(root, 'view')
  V.render = {
    view: V.newTemplate('view.html'),
  }
}

V.newTemplate = function (file) {
  return handlebars.compile(fs.readFileSync(path.join(V.viewPath, file), 'utf8'))
}

V.viewRender = function (bookObj, fileObj, useLocal, user) {
  if (fileObj.file.endsWith('.md')) {
    var title = /^#+([^\n]*)\n/.exec(fileObj.text)
    title = (title === null) ? '' : title[1]
    var ctitle = /chinese:.*\n#+([^\n]*)\n/.exec(fileObj.text)
    ctitle = (ctitle === null) ? '' : '=' + ctitle[1]
    fileObj.title = title + ctitle
  } else {
    fileObj.html = '```\n' + fileObj.text + '\n```'
    fileObj.title = ''
  }
  bookObj.json = JSON.stringify(bookObj, null, 1)
  return V.render.view({book: bookObj, file: fileObj, useLocal: useLocal, user: user})
}
