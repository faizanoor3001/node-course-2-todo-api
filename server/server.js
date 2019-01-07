var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// store express application
var app = express();
// Steps to deploy on heroku
// Step 1: defined below line to deploy to heroku , the property value process.env.PORT will be replaced if running on heroku
const port = process.env.PORT || 3000;

// Step 2:
//define a start script in package.json --> "start" : "node server/server.js"

//Step 3:


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc) => {
      res.status(201).send(doc);
  },
    (e) => {
        res.status(400).send(e);
  });
  //console.log(req.body);
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) =>{
    res.status(400).send(e);
  } )
});

// GET /todos/id
// eg : /todos/1234

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
      res.status(404).send("Not a Valid Id");
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
          return res.status(400).send("No Todo Found");
        }
          res.send({todo});
        }).catch((e) => {
          res.status(400).send();
        });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

// mongodb_uri = mongodb://faizanoor3001:Job78618!@ds149894.mlab.com:49894/mongodbmlab
