const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const authPolicy = require('../controller/authPolicy');
const compare = require('../models/compare')
const Promise = require('bluebird')
const Tasks = require('../models/task')
const bcrpyt = Promise.promisifyAll(require('bcrypt-nodejs'))


function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (app) => {
  app.post('/register', authPolicy.register, (req, res) => {

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

  app.get('/tasks', (req, res) => {
    try{
      const task = Tasks.find({}, function (err, task) {
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

  app.post('/tasks', (req, res) => {
    try{
      var completed = ''
      if (req.body.completed) {
        completed = 'completed'
      }
      var newTask = new Tasks({
        task: req.body.task,
        taskImageUrl: req.body.taskImageUrl,
        completed: completed,
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
}
