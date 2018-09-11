sudo service mongod start
sudo service mongod restart
sudo service mongod stop


mongo --port 27017 -u ccc -p xxxxxxx --authenticationDatabase mdbook
// https://docs.mongodb.com/manual/tutorial/enable-authentication/

mongod --dbpath db
use admin
db.createUser(
  {
    user: "ccc",
    pwd: "xxxxxxx",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
use mdbook
db.createUser(
  {
    user: "ccc",
    pwd: "xxxxxxx",
    roles: [ { role: "readWrite", db: "mdbook" } ]
  }
)

https://docs.mongodb.com/manual/tutorial/enable-authentication/

//============================================================
use bookdown
db.createUser(
  {
    user: "ccc",
    pwd: "xxxxxxx",
    roles: [ { role: "readWrite", db: "bookdown" } ]
  }
)

mongod --auth --dbpath db

mongo bookdown -u "ccc" -p "xxxxxxx" --authenticationDatabase "bookdown"

```javascript
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://dave:password@localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});
```

如果認證不是用該資料庫，而是 admin，則應該使用

mongodb://dave:password@localhost:27017/myproject?authSource=admin