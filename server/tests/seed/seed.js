const {ObjectID} = require('mongodb'),
  {Todo} = require('./../../models/todo'),
  {User} = require('./../../models/user'),
  jwt = require('jsonwebtoken'),

  userOneId = new ObjectID(),
  userTwoId = new ObjectID(),

  users = [{
    _id: userOneId,
    email: `william@gmail.com`,
    password: `userOnePass`,
    tokens: [{
      access: `auth`,
      token: jwt.sign({
        _id: userOneId,
        access: `auth`
      }, `raider123`).toString()
    }]
  }, {
    _id: userTwoId,
    email: `bubba@gmail.com`,
    password: `userTwoPass`
  }],

  todos = [{
    text: 'First test todo',
    _id: new ObjectID()
  }, {
    text: 'Second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
  }],

  populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos)
    }).then(() => done())
  },

  populateUsers = (done) => {
    User.remove({}).then(() => {
      var userOne = new User(users[0]).save()
      var userTwo = new User(users[1]).save()

      return Promise.all([userOne, userTwo])
    }).then(() => done())
  }
module.exports = {todos, users, populateTodos, populateUsers}
