const expect = require('expect');
const request = require('supertest');
// const server = require('./server');
var {ObjectID} = require('mongodb');

// run the tests by commanf  ---> npm run-script test-watch <command>

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id : new ObjectID(),
  text: 'First test todo'
}, {
  _id : new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 33333
}];

const id = '5c32580f2495744788e4d898';

beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(()=> (done()));
});

// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

describe('POST /todos', () => {
  it("should create a new todo " , (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(201 )
      .expect((res) => {
          expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it("should not create a todo with invalid body data", (done) => {

     request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});


describe('GET /todos' , () => {
  it("should get all the Todos", (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe("GET /todos/:id" , () => {
  it("should return a todo with given id" , (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 400 if todo is not found" , (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(400)
      .end(done);
  });

  it("should return 404 for non- object id's" , (done) => {
    request(app)
      .get('/todo/1234')
      .expect(404)
      .end(done);
  })
});


describe("DELETE /todos", () => {
  it("should delete all the todos" , (done) => {
    request(app)
      .delete('/todos')
      .expect(204)
      .end(done);
  })
});

describe("DELETE /todos/:id", () => {
  it("should delete all the todos with id and return 200" , (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it("should throw 404 with invalid id", (done) => {
    request(app)
      .delete('/todos/1234')
      .expect(404)
      .end(done);
  });

  it("should throw 404 when todo is not found", (done) => {
    var id = new ObjectID().toHexString;
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", ()=> {
  it("should be updated for the given id ", (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "Something to do in test suite"
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
      // this need not to be checked in case of  update
      // Todo.findById(hexId).then((todo) => {
      //   expect(todo).toExist();
      //   //expect(todo[0]._id).toBe(hexId);
      //   done();
      // }).catch((e) => done(e));
    });

    it("should clear completedAt when the todo is not complete ", (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = "Something to do in test suite 2"
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
      });
  });
