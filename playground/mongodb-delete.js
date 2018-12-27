const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');
  const todoApp = client.db(dbName);
  // deleteMany ---->
  // todoApp.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log('Result of deletemany', result);
  //   console.log(`Result of deletemany ${result}`);
  // });

  // deleteOne ------>
 // todoApp.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
 //   console.log(result);
 // });

// findOneAndDelete ------>
 // todoApp.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
 //   console.log(result);
 // });

 // deleteOne -->

 todoApp.collection('Users').deleteOne({_id: new ObjectID('5c249d724b4b9c3ed826a92a')}).then((result) => {
   console.log('In delete One result -->', result);
 });

 todoApp.collection('Users').deleteMany({location : 'Delhi'}).then((result) => {
   console.log('In delete Many result --> ' , result);
 });

 todoApp.collection('Users').findOneAndDelete({_id: new ObjectID('5c24d98125e8de3a12757f2c')}).then((result) => {
   console.log('In find one and delete result --> ', result);
 });

// {
//     "_id" : ObjectId("5c24d98125e8de3a12757f2c"),
//     "name" : "Faizi",
//     "age" : 27,
//     "location" : "Lucknow"
// }

    client.close();
});
