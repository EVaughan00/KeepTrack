const mongoose = require('mongoose')
const User = require('../models/user')
const authPolicy = require('../controller/authPolicy');

module.exports = (app) => {
  authPolicy.register()
  app.post('/register', (req, res) => {
  var email = req.body.email
  var password = req.body.password
  console.log('adding ' + email)
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
})
}
