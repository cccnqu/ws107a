var fs = require('fs'); // 引用檔案物件

var myReadFile = function (fileName, callback) {
  fs.readFile(fileName, "utf8", function(error, text) {
    callback(error, text)
  });
}

myReadFile(process.argv[2], function(err, data) {
  if (err) {
    console.log(err)
  }
  console.log("data="+data);
});

console.log("----readFile End-----"); // 顯示在螢幕上