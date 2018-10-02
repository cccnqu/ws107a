var fs = require('mz/fs'); // 引用檔案物件

async function main() {
  var text = await fs.readFile('package.json', 'utf-8')
  var text2 = await fs.readFile('mongodbTest.js', 'utf-8')
  console.log('text=', text)
  console.log('text2=', text2)
  return text
}

main().catch(function (error) {
  console.log('error=', error)
})
