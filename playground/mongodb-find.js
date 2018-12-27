const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');
  const todoApp = client.db(dbName);
  // todoApp.collection('Todos').find(
  //       //completed: false
  //   //_id : new ObjectID('5c247a69cff9a20da0699388')
  // // }).toArray().then((docs) => {
  // ).count().then((count) => {
  //     console.log(`Todos count: ${count}`);
  //     //console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //     console.log('Unable to fetch todos', err);
  // });

  todoApp.collection('Users').find({name:'Faiza'}).toArray().then((docs) => {
    console.log('USers JSON');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
      console.log('Unable to fetch the todos for name Faiza', err);
  } )
  client.close();
});
