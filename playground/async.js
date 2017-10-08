var rp = require('request-promise')
const express = require('express'),
  app = express(),
  { Todo } = require('./../server/models/todo'),
  request = require('request')

async function go () {
  const p1 = rp('http://www.stagecenter.net')
  const p2 = rp('http://example.com/')
  const res = await Promise.all([p1, p2])
  const dataPromises = res.map(r => r.json())
  console.log(dataPromises)

  console.log(res)
}
go()
// function breathe (amount) {
//   return new Promise((resolve, reject) => {
//     if (amount < 500) {
//       reject(`That is too small of a value`)
//     }
//     setTimeout(() => {
//       resolve(`Done for ${amount} ms`), amount
//     })
//   })
// }

// function catchErrors (fn) {
//   return function (...args) {
//     return fn(...args).catch((err) => {
//       console.error(`Ohhhh Noooooo`)
//       console.error(err)
//     })
//   }
// }

// async function go (firstName, lastName) {
//   console.log(`Starting for ${firstName} ${lastName}`)
//   const res = await breathe(600)
//   console.log(res)
//   const res1 = await breathe(900)
//   console.log(res1)
//   const res2 = await breathe(300)
//   console.log(res2)
//   const res3 = await breathe(1600)
//   console.log(res3)
//   const res4 = await breathe(1000)
//   console.log(res4)
//   console.log(`End`)
// }
// const wrappedFunction = catchErrors(go)
// wrappedFunction(`Billy`, `Myrick`)

// await breathe(100);
// await breathe(500);
// await breathe(5000);
// breathe(1000).then(res => {
//   console.log(res)
//   return breathe(500)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).then(res => {
//   console.log(res)
//   return breathe(300)
// }).catch(err => {
//   console.error(err)
//   console.log(`you screwed up`)
// })

// require('request')
// .get('http://www.example.com/', (err, res) => {
//   if (err) {
//     console.error(err)
//   } else {
//     require('fs')
//         .writeFile('google.html', res.body, (err) => {
//           if (err) {
//             console.error(err)
//           } else {
//             console.log('wrote file')
//           }
//         })
//   }
// })
// require('popsicle').get('http://www.google.com')
// .then((response) => {
//   return require('fs-promise').writeFile('google.html', response.body)
// })
// .then(() => {
//   console.log('wrote file')
// })
// .catch((err) => {
//   console.log(err)
// })

// var handler = (req, res) => {
//   User.get(req.user, (err, user) => {
//     if (err) {
//       res.send(err)
//     } else {
//       Notebook.get(user.notebook, (err, notebook) => {
//         if (err) {
//           return res.send(err)
//         } else {
//           doSomethingAsync(user, notebook, (err, result) => {
//             if (err) {
//               res.send(err)
//             } else {
//               res.send(result)
//             }
//           })
//         }
//       })
//     }
//   })
// }

// async function(req,res){
//     try{
//         var user = await User.get(req.user)
//         var notebook = await Notebook.get(user.notebook)
//         res.send(await doSomethingAsync(user,notebook))
//     } catch(err){
//         res.send(err)
//     }
// }
// function getRandomPonyFooArticle () {
//   return new Promise((resolve, reject) => {
//     request('https://ponyfoo.com/articles/random', (err, res, body) => {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(body)
//     })
//   })
// }

// function handler (req, res) {
//   return request('https://user-handler-service')
//     .catch((err) => {
//       logger.error('HTTP error', err)
//       error.logged = true
//       throw err
//     })
//     .then((response) => Mongo.findOne({
//       user: response.body.user
//     }))
//     .catch((err) => {
//       !error.logged && logger.error(`Mongo error`, err)
//       error.logged = true
//       throw err
//     })
//     .then((document) => executeLogic(req, res, document))
//     .catch((err) => {
//       !error.logged && console.error(err)
//       res.status(500).send()
//     })
// }

// function getJSON () {
//     // To make the function blocking we manually create a Promise.
//   return new Promise((resolve) => {
//     rp('http://example.com/')
//         .then((json) => {
//             // The data from the request is available in a .then block
//             // we return the result using resolve
//           resolve(json)
//         })
//   })
// }
// async function getJSONAsync () {
//     // The await keyword saves us from having to write a .then() block
//   let json = await rp('http://example.com/')

//     // the result of the GET reques is available in the json variable
//     // We return it just like in a regular synchronous function
//   return (console.log(json))
// }
// getJSONAsync()

// app.get('/todos', (req, res) => {
//   Todo.find().then((todos) => {
//     res.send({ todos })
//   }, (e) => {
//     if (e) {
//       res.status(400).send(e)
//     }
//   })
// })

async function run () {
  const app = express()
  app.get('*', async function (req, res) {
    res.send('Hello World')
  })
  app.listen(3000, () => {
    console.log(`server listening on 3000`)
  })
}
run().catch(error => console.error(error.stack))
