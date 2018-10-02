const fs = require('mz/fs')
const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setOption('tables', true)

async function main() {
  const filePath = './test.md'
  const fileText = await fs.readFile(filePath, 'utf8')
  const html = converter.makeHtml(fileText)
  console.log(html)
  await fs.writeFile('test.html', html, 'utf8')
}

main()
