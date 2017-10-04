require('./config/config')

const express = require('express'),
  bodyParser = require('body-parser'),
  { ObjectID } = require('mongodb'),
  _ = require('lodash'),
  PORT = process.env.PORT

var { mongoose } = require('./db/mongoose'),
  { Todo } = require('./models/todo'),
  { User } = require('./models/user'),
  {authenticate} = require('./middleware/authenticate')

var app = express()
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt

  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (e) => {
    if (e) {
      res.status(400).send(e)
    }
  })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({ todo })
  }).catch((e) => {
    res.status(400).send()
  })
})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not valid')
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Todo not found')
    }
    res.status(200).send({ todo })
  }).catch((e) => {
    res.status(404).send()
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({ todo })
  }).catch((e) => {
    res.status(400).send
  })
})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  // User.findByToken
  // user.generateAuthToken

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header(`x-auth`, token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = { app }
