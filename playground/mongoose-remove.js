const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


Todo.findOneAndRemove({_id: '5c33046cb16fd4561034a60c'}).then((todo) => {
  console.log(todo);
});


Todo.findById('5c330476b16fd4561034a60d').then((todo) => {
  console.log(todo);
});
