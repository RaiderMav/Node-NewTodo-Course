// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/NewTodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  }
  console.log(`Connected to MongoDB server`)

  // deleteMany
  // db.collection('NewTodos').deleteMany({text: `Do one more thang`}).then((res) => {
  //   console.log(res)
  // })
  // deleteOne
  // db.collection('NewTodos').deleteOne({
  //   text: 'Do one more thang'
  // }).then((res) => {
  //   console.log(res)
  // })
  // findOneAndDelete
  // db.collection('NewTodos').findOneAndDelete({
  //   completed: false
  // }).then((res) => {
  //   console.log(res)
  // })
  // db.collection('Users').deleteMany({
  //   name: 'William Myrick'
  // }).then((res) => {
  //   console.log(res)
  // })
  // db.collection('Users').deleteOne({
  //   _id: new ObjectID('59cbbc3f86c47712745c2da6')
  // }).then((res) => {
  //   console.log(res)
  // })
  db.collection('Users').findOneAndDelete({
    location: 'Conroe, TX'
  }).then((res) => {
    console.log(res)
  })
  // db.close()
})
