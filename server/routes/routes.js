const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const authPolicy = require('../controller/authPolicy');
const compare = require('../models/compare')
const Promise = require('bluebird')
const Tasks = require('../models/task')
const Cakes = require('../models/cakes')
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
  console.log('adding ' + email)
  User.findOne({email: email}).then((currentUser) => {
    if (currentUser){
      console.log('User ' + email + ' already exists')
      res.send({
        message: `User ${email} already exists`,
        exists: true
      })
    } else {
      var newUser = new User({
        name: name,
        email: email,
        password: password
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
          console.log('user doesnt exists');
          res.status(403).send({
            error: 'Login information incorrect',
            auth: false
          })
        } else {
          const validPassword = compare.comparePassword(password, user.password)
          if (validPassword){
            const userJson = user.toJSON()
            console.log('Authenticated');
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
  app.get('/tasks', (req, res) => {
    try{
      const task = Tasks.find({ completed: false }, function (err, task) {
        console.log(task);
        res.send(task)
      })
      console.log('found');
    } catch (err) {
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// Completes Tasks
  app.get('/completed', (req, res) => {
    try{
      const task = Tasks.find({ completed: true }, function (err, task) {
        console.log(task);
        res.send(task)
      })
      console.log('found');
    } catch (err) {
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// Adds new tasks
  app.post('/tasks', (req, res) => {
    try{
      var newTask = new Tasks({
        task: req.body.task,
        taskImageUrl: req.body.taskImageUrl,
        completed: req.body.completed,
        initial: null
      })
      newTask.save(function (err) {
        console.log(err);
      })
      res.send(newTask)
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// Adds completed tasks to dash
  app.post('/addtodash/:task', (req, res) => {
    var task = req.params.task
    console.log('\nTask is ' + task + '\n')
    try{
      Tasks.updateOne({ task: task }, { $set: { completed: "false", initial: null }}, function (err, res) {
        if (err) {
          console.log(err)
        }
      })
      res.send({ message: `${task} added to dash`})
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// Completes tasks
  app.post('/tasks/:task', (req, res) => {
    var task = req.params.task
    var initial = req.body.initial
    console.log('\nTask is ' + task + '\n')
    console.log('\ninitial is ' + initial + "\n")
    try{
      Tasks.updateOne({ task: task }, { $set: { completed: "true", initial: initial }}, function (err, res) {
        if (err) {
          console.log(err)
        }
      })
      console.log(task)
      res.send({ message: `${task} completed by ${initial}`})
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// Recieves messages
  app.get('/messages', (req, res) => {
    try{
      const message = Messages.find({}, function (err, message) {
        console.log('These are the messages: ' + message);
        res.send(message)
      })
      console.log('found');
    } catch (err) {
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

// makes new messages
  app.post('/messages', (req, res) => {
    var message = req.body.message
    var user = req.body.user
    console.log('Message is ' + message)
    try{
      var newMessage = new Messages({
        message: message,
        user: user
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
  })

  // Adds new cakes
  app.post('/cakes', (req, res) => {
    try{
      var newCake = new Cakes({
        customerName: req.body.customerName,
        dueDate: req.body.dueDate,
        cake: req.body.cake,
        message: req.body.message,
        size: req.body.size
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
  })

  // revies cakes
  app.get('/cakes', (req, res) => {
    try{
      const task = Cakes.find({}, function (err, cake) {
        console.log(cake);
        res.send(cake)
      })
      console.log('found');
    } catch (err) {
      res.status(500).send({
        error: 'error occured'
      })
    }
  })

  // add new Paperwork
  app.post('/paperwork', (req, res) => {
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
        drop: req.body.drop
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
  })
}
