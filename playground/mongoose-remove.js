const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {User} = require('./../server/models/user'),
  {ObjectID} = require('mongodb')

// Todo.remove({}).then((res) => {
//   console.log(res)
// // })

// Todo.findOneAndRemove({
//     _id:'59d0d64f9e4a8fe4261bbe94'
// }).then((todo) => {

// })

// Todo.findByIdAndRemove('59d0d64f9e4a8fe4261bbe94').then((todo) => {
//   console.log(todo)
// })
