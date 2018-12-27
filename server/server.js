const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');

const url = 'mongodb://localhost:27017/TodoApp';
mongoose.connect(url, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required : true,
    minlength : 1,
    trim : true
  },
  completed: {
    type: Boolean,
    default : false
  },
  completedAt : {
    type: Number,
    default : null
  }
});

// // testing the validation -->
// var otherTodo = new Todo({
//     text : 'Something to do  '
// });
// otherTodo.save().then((doc) => {
//   console.log('saved the other todo');
// }, (e) => {
//     console.log('error in saving the todo', e);
// });



// var newTodo = new Todo({
//   text: 'Make Lunch Ready'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo--> ', doc);
// }, (e) => {
//   console.log('Unable to save todo', e);
// });
//
// var newTodo1 = new Todo({
//   text: 'Cook Breakfast today',
//   completed : false,
//   completedAt : 8
// });
//
// newTodo1.save().then((doc) => {
//   console.log('Updated a new Todo as well -->', doc);
// }, (e) => {
//   console.log('unable to save the todo2');
// });


// // --- user task -->
// var userSchema = new Schema({
//   email: {
//     type: String,
//     required : true,
//     trim : true,
//     minlength : 1
// });
//
// var User = mongoose.model('User', userSchema);

var User = mongoose.model('User' , {
  email: {
    type: String,
    required : true,
    trim : true,
    minlength : 1
  }
});

var newUser = new User({
  email: 'faizanoor3001@gmail.com'
});

newUser.save().then((doc)=> {
  console.log('created a new user --> ', doc);
}, (e) => {
    console.log('Unable to inseert the user => ', e);
});

});
