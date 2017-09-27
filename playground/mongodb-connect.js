// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/NewTodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  }
  console.log(`Connected to MongoDB server`)
  // db.collection('NewTodos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log(`Unable to add todo: ${err}`)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  // })
  // db.collection('Users').insertOne({
  //   name: 'William Myrick',
  //   age: 55,
  //   location: 'Conroe, TX'
  // }, (err, res) => {
  //   if (err) {
  //     return console.log(`Unable to add User: ${err}`)
  //   }
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2))
  // })
  db.close()
})
