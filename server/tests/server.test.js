const expect = require('expect'),
  request = require('supertest'),

  {app} = require('./../server'),
  {Todo} = require('./../models/todo'),
  {User} = require('./../models/user')

beforeEach((done) => {
  Todo.remove({}).then(() => done())
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
          Todo.find().then((todos) => {
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
        expect(todos.length === 0)
        done()
      }).catch((e) => done(e))
    })
  })
})
