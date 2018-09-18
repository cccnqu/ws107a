const fs = require('mz/fs')
const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setOption('tables', true)

async function main() {
  const filePath = '../book/ccc/README.md'
  const fileText = await fs.readFile(filePath, 'utf8')
  const html = converter.makeHtml(fileText)
  console.log(html)
  await fs.writeFile('ccc.html', html, 'utf8')
}

main()
