// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/NewTodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  }
  console.log(`Connected to MongoDB server`)

  // db.collection('NewTodos').find({
  //   _id: new ObjectID('59cbaf453c5d6352d104b8d6')
  // }).toArray().then((docs) => {
  //   console.log(`NewTodos`)
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log(`Unable to fetch NewTodos. ${err}`)
  // })
  // db.collection('NewTodos').find({}).count().then((count) => {
  //   console.log(`NewTodos count: ${count}`)
  // }, (err) => {
  //   console.log(`Unable to fetch NewTodos. ${err}`)
  // })
  db.collection('Users').find({name: 'Billy Myrick'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log(`Unable to find User...`)
  })
  // db.close()
})
