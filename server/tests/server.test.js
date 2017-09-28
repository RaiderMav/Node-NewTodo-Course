const expect = require('expect'),
  request = require('supertest'),

  {app} = require('./../server'),
  {Todo} = require('./../models/todo'),
  {User} = require('./../models/user'),

  todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }]

beforeEach((done) => {
  Todo.remove().then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('POST /todos', () => {
  it(`should add a new todo`, (done) => {
    var text = 'I am a test todo'
    request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          Todo.find({text}).then((todos) => {
            expect(todos.length === 1)
            expect(todos[0].text).toBe(text)
            done()
          }).catch((e) => done(e))
        })
  })
  it(`should NOT create a todo with invalid data`, (done) => {
    request(app)
    .post('/todos')
    .send({text: ''})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find().then((todos) => {
        expect(todos.length === 2)
        done()
      }).catch((e) => done(e))
    })
  })
})

describe(`GET /todos`, () => {
  it(`should get all todos`, (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2)
    })
    .end(done)
  })
})
