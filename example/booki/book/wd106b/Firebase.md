# Firebase

## 範例

* https://github.com/firebase/quickstart-js/

## Realtime Database

* https://firebase.google.com/docs/database/web/read-and-write?authuser=0

## Cloud Firestore

* https://codelabs.developers.google.com/codelabs/firestore-web/#0
* https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

var messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');

Notice the alternating pattern of collections and documents. Your collections and documents must always follow this pattern. You cannot reference a collection in a collection or a document in a document.