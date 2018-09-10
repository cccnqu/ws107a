const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mytest';
/*
const findDocuments = async function(db) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  var docs = collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
*/

async function main() {
  // Use connect method to connect to the server
  var client = await MongoClient.connect(url)
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const collection = db.collection('documents')
  var iresult = await collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ])
  console.log("iresult=", iresult)
  var docs = await collection.find({}).toArray()
  console.log('docs=', docs)
  client.close();
  return docs
}

main().catch(function (error) {
  console.log('error=', error)
})
