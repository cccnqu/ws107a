# async/await

koa 大量採用 async/await 的語法簡化回呼過程

傳統方式

```js
var fs = require('fs');
fs.readFile("asyncFile.js", "utf8", function(err, data) {
  console.log('讀取完成!');
  fs.writeFile("asyncFile.js2",  data, function(err) {
    console.log('寫入完成!');
    fs.readFile("asyncFile.js2", "utf8", function(err, data) {
      console.log('又讀取完成 !');
      fs.writeFile("asyncFile.js3",  data, function(err) {
        console.log('又寫入完成!');
      });
    });
  });
});
```

使用 async/await 的方式

```js
var fs = require('mz/fs')

async function main() {
  var data1 = await fs.readFile("asyncFile.js", "utf8");
  console.log('讀取完成!');
  await fs.writeFile("asyncFile.js2", data1);
  console.log('寫入完成!');
  var data2 = await fs.readFile("asyncFile.js2", "utf8");
  console.log('又讀取完成 !');
  await fs.writeFile("asyncFile.js3", data2);
  console.log('又寫入完成!');
}

main()
```