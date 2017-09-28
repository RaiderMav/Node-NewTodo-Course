const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {User} = require('./../server/models/user'),
  {ObjectID} = require('mongodb')

// var id = '59cd6316d8b3f2b5a2508008hh'

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(`Todo: ${todo}`)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log(`Id not found`)
//   }
//   console.log(`Todo by Id: ${todo}`)
// }).catch((e) => console.log(e))
User.findById('59cbfecb4fe4be0b883e2535xx').then((user) => {
  if (!user) {
    return console.log(`No user found`)
  }
  console.log(JSON.stringify(user), undefined, 2)
}).catch((e) => console.log(e.message))
