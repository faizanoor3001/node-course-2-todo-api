//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';

var objid = new ObjectID();
console.log(objid);

// resrtucturing --->>as above
// var user = {name: 'faiza' , age: 27 }
// console.log(user);
// // toggling of properties
// var {name} = user;
// console.log(name);
const dbName = 'TodoApp';
//const dbName1 = 'UserDB';
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');
  // const todoApp = client.db(dbName);
  // //const userDB = client.db(dbName1);
  //
  // todoApp.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed:false
  // }, (err, result) => {
  //   if(err) {
  //       console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined,2));
  // });
  //
  // todoApp.collection('Users').insertOne({
  //   name: 'Faiza',
  //   age: 27,
  //   location: 'Lucknow'
  // }, (err, result) => {
  //   if(err) {
  //     console.log('Unable to insert user', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});
