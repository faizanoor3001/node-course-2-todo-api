const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb')
var id = '5c32580f2495744788e4d898';

if(!ObjectID.isValid(id)) {
  console.log("Id not vald");
}

//
// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log('Todos find', todos);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log('Todo findOne', todo);
// });

Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log('Id not found');
  }
  console.log('Todo find by id' , todo);
}).catch((e) => console.log(e));
