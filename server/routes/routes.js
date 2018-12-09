const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const authPolicy = require('../controller/authPolicy');
const compare = require('../models/compare')
const Promise = require('bluebird')
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
        message: `User ${email} already exists`
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
      res.send({
        message: `${email} authenticated`
      })
    }
  })

})

  app.post('/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    try {
      User.findOne({email: email}).then((currentUser) => {
        // const jsonUser = newUser.toJSON()
        // res.send({
        //   user: jsonUser
        // })
        var user = currentUser
        if (!currentUser){
          console.log('user doesnt exists');
          res.status(403).send({
            error: 'Login information incorrect'
          })
        } else {
          const validPassword = compare.comparePassword(password, user.password)
          if (validPassword){
            const userJson = user.toJSON()
            res.send({
              user: userJson,
              token: jwtSignUser(userJson)
            })
          } else {
            console.log('incorrect password');
            res.status(403).send({
              error: 'Login information incorrect'
            })
          }
        }

        // if () {
        //     res.status(403).send({
        //       error: 'Login information incorrect'
        //     })
        // }
        // const userJson = newUser.toJSON()
        // res.send({
        //   user: userJson
        // })

      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured'
      })
    }
  })
}
