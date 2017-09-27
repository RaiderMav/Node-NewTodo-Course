// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/NewTodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  }
  console.log(`Connected to MongoDB server`)

  // findOneAndUpdate
  // db.collection('NewTodos').findOneAndUpdate({
  //   _id: new ObjectID('59cbe1f1c067f2e7325b3627')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res)
  // })
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59cbe1ac997b2aee45eaf301')
  }, {
    $set: {
      name: 'Billy Boy Myrick',
      location: 'Berkeley, CA'
    },

    $inc: {
      age: 1
    }

  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  })

  // db.close()
})
