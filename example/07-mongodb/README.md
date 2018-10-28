# MongoDB

* [Robomongo — 好用的 MongoDB GUI manager](https://medium.com/@wilsonhuang/robomongo-%E5%A5%BD%E7%94%A8%E7%9A%84-mongodb-gui-manager-87508da806e5)

* export 單一表格
  * mongoexport --host localhost -d blogmvc --collection profiles -o blog.profiles.json

2018-10-28T09:37:13.315+0800    connected to: localhost
2018-10-28T09:37:13.436+0800    exported 2 records

* dump 整個資料庫 & restore (注意：是 bson 格式)

PS D:\course> mongodump -h localhost -d blogmvc -o ./blogmvc
2018-10-28T09:41:41.887+0800    writing blogmvc.posts to
2018-10-28T09:41:41.996+0800    writing blogmvc.profiles to
2018-10-28T09:41:42.002+0800    done dumping blogmvc.profiles (2 documents)
2018-10-28T09:41:42.012+0800    done dumping blogmvc.posts (1 document)