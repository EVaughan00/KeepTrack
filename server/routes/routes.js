const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const authPolicy = require('../controller/authPolicy');
const taskController = require('../controller/taskController');
const compare = require('../models/compare')
const Promise = require('bluebird')
const Tasks = require('../models/task')
const Cakes = require('../models/cakes')
const CakeInv = require('../models/cakeinv')
const bcrpyt = Promise.promisifyAll(require('bcrypt-nodejs'))
const Messages = require('../models/messages')
const Paperwork = require('../models/paperwork')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (app) => {
  app.post('/register', authPolicy.register, (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = compare.hashPassword(req.body.password)
  var store = req.body.store
  User.findOne({email: email}).then((currentUser) => {
    if (currentUser){
      res.send({
        message: `User ${email} already exists`,
        exists: true
      })
    } else {
      var newUser = new User({
        name: name,
        email: email,
        password: password,
        store: store
      })
      newUser.save(function (error) {
        if (error) {
          console.log(error)
        }
      })
      const userJson = newUser.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    }
  })

})

// Login
  app.post('/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    try {
      User.findOne({email: email}).then((currentUser) => {
        var user = currentUser
        if (!currentUser){
          res.status(403).send({
            error: 'Login information incorrect',
            auth: false
          })
        } else {
          const validPassword = compare.comparePassword(password, user.password)
          if (validPassword){
            const userJson = user.toJSON()
            res.send({
              user: userJson,
              token: jwtSignUser(userJson),
              auth: true
            })
          } else {
            console.log('incorrect password');
            res.status(403).send({
              error: 'Login information incorrect',
              auth: false
            })
          }
        }

      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured'
      })
    }
  })


// Recieves incompleted tasks
  app.get('/tasks/incompleted/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.getIncompTasks(store, res)
  })

// Recieves completed Tasks
  app.get('/tasks/completed/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.getCompTasks(store, res)
  })

// Adds new tasks
  app.post('/tasks/add/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.postNewTask(store, req, res)
  })

// Adds completed tasks to dash
  app.post('/tasks/dash/:token', (req, res) => {
    var task = req.body.task
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.postTaskToDash(store, res, task)
  })

  app.post('/tasks/remove/:token', (req, res) => {
    var task = req.body.task
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.deleteTask(store, task, res)
  })

// Completes tasks
  app.post('/tasks/complete/:token', (req, res) => {
    var initial = req.body.initial
    var task = req.body.task
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.postCompletedTask(store, initial, task, res)
  })

  // Recieves Daily Task template
  app.get('/template/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.getTemplateTasks(store, res)
  })

  // Creates new task template
  app.post('/template/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    taskController.postNewTemplate(store, res, req)
  })

// Recieves messages
  app.get('/messages/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    if (store!=false) {
        try{
          const message = Messages.find({ store: store }, function (err, message) {
            res.send(message)
          })
        } catch (err) {
          res.status(500).send({
            error: 'error occured'
          })
        }
      }
  })

// makes new messages
  app.post('/messages/:token', (req, res) => {
    var message = req.body.message
    var user = req.body.user
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    if (store!=false) {
      try{
        var newMessage = new Messages({
          message: message,
          user: user,
          store: store
        })
        newMessage.save(function (err) {
          console.log(err);
        })
        res.send(newMessage)
        } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'error occured'
        })
        }
      }
  })

  // Adds new cakes
  app.post('/cakes/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    if (store!=null) {
      try{
        var newCake = new Cakes({
          customerName: req.body.customerName,
          dueDate: req.body.dueDate,
          cake: req.body.cake,
          message: req.body.message,
          size: req.body.size,
          store: req.body.store
        })
        newCake.save(function (err) {
          console.log(err);
        })
        res.send(newCake)
        } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'error occured'
        })
      }
    }
  })

  // revies cakes
  app.get('/cakes/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    if (store!=null) {
      try{
        const task = Cakes.find({ store: store }, function (err, cake) {
          res.send(cake)
        })
        console.log('found')
      } catch (err) {
        res.status(500).send({
          error: 'error occured'
        })
      }
    }
  })

  // Updates Cake Status
  app.post('/cakes/:cake', (req, res) => {
    try{
      var cake = req.params.cake
      var initial = req.body.initial
      Cakes.updateOne({ customerName: cake }, { $set: { madeBy: initial }}, function (err, res) {
        if (err) {
          console.log(err)
        }
      })
      res.send({ message: `${cake} completed by ${initial}`})
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'error occured'
        })
      }
  })

  // add new Paperwork
  app.post('/paperwork/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    if (store!=null) {
      try{
        var newPaper = new Paperwork({
          name: req.body.name,
          date: req.body.date,
          notes: req.body.notes,
          total: req.body.total,
          cash: req.body.cash,
          redeemed: req.body.redeemed,
          activated: req.body.activated,
          short: req.body.short,
          drop: req.body.drop,
          credit: req.body.credit,
          visa: req.body.visa,
          mc: req.body.mc,
          amx: req.body.amx,
          discover: req.body.discover,
          store: req.body.store
        })
        newPaper.save(function (err) {
          console.log(err);
        })
        res.send({ message: 'Paperwork added' })
        } catch (err) {
          console.log(err);
          res.status(500).send({
            error: 'error occured'
          })
        }
      }
  })

  // Creates new cake inventory
  app.post('/cakesinv', (req, res) => {
    try{
      var newCakeInv = new CakeInv({
        LCC: req.body.LCC,
        SCC: req.body.SCC,
        SMint: req.body.SMint,
        LMint: req.body.LMint,
        SCBC: req.body.SCBC,
        LCBC: req.body.LCBC,
        SCHIP: req.body.SCHIP,
        LCHIP: req.body.LCHIP,
        SCD: req.body.SCD,
        LCD: req.body.LCD,
        SCOF: req.body.SCOF,
        LCOF: req.body.LCOF,
        SSP: req.body.SSP,
        LSP: req.body.LSP,
        SCND: req.body.SCND,
        LCND: req.body.LCND,
        SPBP: req.body.SPBP,
        LPBP: req.body.LPBP,
        SMD: req.body.SMD,
        LMD: req.body.LMD,
        STDD: req.body.STDD,
        LTDD: req.body.LTDD
      })
      newCakeInv.save(function (err) {
        console.log(err);
      })
      res.send(newCakeInv)
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

  // recieves cake inventory
  app.get('/cakesinv', (req, res) => {
    try{
      const query = CakeInv.find({}).sort({_id:1})[0]
      console.log(query)
      res.send(query)
    } catch (err) {
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

  app.get('/location/:token', (req, res) => {
    var token = req.params.token
    var store = authPolicy.validateToken(token)
    console.log(store)
    if (store!=false) {
      res.send({store: store})
    } else {
      console.log('sending error')
      res.send({error: 'error'})
    }
  })
}
