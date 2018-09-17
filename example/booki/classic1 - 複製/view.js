const V = module.exports = {}
const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setOption('tables', true)

V.init = async function () {

}

V.md2html = function (text) {
  return converter.makeHtml(text)
}

V.layout = function (book, file) {
  return `
  <html>
  <head>
    <title>${book.title}</title>
    <link rel="stylesheet" type="text/css" href="/main.css" />
  </head>
  <body>
    <section id="content">
      ${V.md2html(file.text)}
    </section>
  </body>
  </html>
  `
}

