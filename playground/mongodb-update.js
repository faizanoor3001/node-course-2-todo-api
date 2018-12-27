const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');
  const todoApp = client.db(dbName);

  todoApp.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5c24ebf625e8de3a12758456')
  } ,
  {
    $set: {name: 'Faiza'},
    $inc: {age: -6}
  } , {
    returnOriginal: false
  }).then((result) => {
    console.log("updated succesfully");
    console.log(result);
  });


    client.close();
});
