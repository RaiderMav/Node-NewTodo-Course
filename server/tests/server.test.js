const expect = require('expect'),
  request = require('supertest'),
  {ObjectID} = require('mongodb'),
  _ = require('lodash'),

  {app} = require('./../server'),
  {Todo} = require('./../models/todo'),
  {User} = require('./../models/user'),
  {populateTodos, users, populateUsers, todos} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

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

describe(`GET /todos/:id`, () => {
  it(`should return todo doc`, (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it(`should return a 404 if todo not found`, (done) => {
    var hexId = new ObjectID().toHexString()
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
   .end(done)
  })

  it(`should return a 404 for non-object ids`, (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done)
  })
})

describe(`DELETE /todos/:id`, () => {
  it(`should remove a todo`, (done) => {
    var hexId = todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist()
        done()
      }).catch((e) => done(e))
    })
  })
  it(`should return 404 if todo not found`, (done) => {
    let hexId = new ObjectID().toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  })
  it(`should return 404 if object id is invalid`, (done) => {
    let hexId = 123
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  })
})

describe(`PATCH /todos/:id`, () => {
  it(`should update the todo`, (done) => {
    let hexId = todos[0]._id.toHexString()
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text: `Some new Test Text`,
      completed: true
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo.completed).toBe(true)
        expect(todo.text).toEqual(`Some new Test Text`)
        expect(todo.completedAt).toBeA(`number`)
        done()
      }).catch((e) => done(e))
    })
  })
  it('should clear the completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString()
    request(app)
    .patch(`/todos/${hexId}`)
    .send({completed: false})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo.completedAt).toNotExist()
        done()
      }).catch((e) => done(err))
    })
  })
})

describe('GET /users/me', () => {
  it(`should return user if authenticated`, (done) => {
    request(app)
.get('/users/me')
.set('x-auth', users[0].tokens[0].token)
.expect(200)
.expect((res) => {
  expect(res.body._id).toBe(users[0]._id.toHexString())
  expect(res.body.email).toBe(users[0].email)
})
.end(done)
  })
  it(`should return a 401 if not authenticated`, (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({})
    })
    .end(done)
  })
})
describe(`POST /users`, () => {
  it(`should create a user`, (done) => {
    var email = `example@example.com`
    var password = '123abc'

    request(app)
    .post(`/users`)
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist()
      expect(res.body._id).toExist
      expect(res.body.email).toBe(email)
    })
.end((err) => {
  if (err) {
    return done(err)
  }
  User.findOne({email}).then((user) => {
    expect(user).toExist()
    expect(user.passworld).toNotBe(password)
    done()
  })
})
  })
  it(`should return validation error if request invalid`, (done) => {
    request(app)
    .post('/users')
    .send({email: '123', password: 4})
    .expect(400)
    .end(done)
  })
  it(`should not create user if email in use`, (done) => {
    request(app)
    .post('/users')
    .send({email: users[0].email, password: users[0].password})
    .expect(400)
    .end(done)
  })
})
