var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

//
// const url = 'mongodb://localhost:27017/TodoApp';
// mongoose.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if(err) {
//     return console.log('Unable to connect to MongoDb server');
//   }
//   console.log('Connected to MongoDb server');
// });
//

module.exports = {mongoose};
