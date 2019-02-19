const joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: joi.string().required(),
      email: joi.string().email(),
      password:joi.string().regex(
        new RegExp('^[a-zA-Z0-9!-)]{8,32}$')
      ),
      store: joi.string().required()
    }

    const {error, value} = joi.validate(req.body, schema)

    if(error){
      console.log('there was an error')
      switch (error.details[0].context.key){
        case 'name':
        res.status(400).send({
          error: 'You must provide a valid name'
        })
        break
        case 'email':
        res.status(400).send({
          error: 'You must provide a valid email address'
        })
        break
        case 'password':
        res.status(400).send({
          error: 'You must provide a valid password'
        })
        break
        case 'store':
        res.status(400).send({
          error: 'Please select a store location'
        })
        break
        default: res.status(400).send({
          error: 'Invalid registration information'
        })
      }
    }else {
      next()
    }
  },
  validateToken (token) {
    var store = ''
    jwt.verify(token, config.authentication.jwtSecret, function (err, decoded) {
      if (err) {
        console.log('Auth Error ' + err)
        store = false
      } else {
        store = decoded.store
      }
    })
    return store
  }
}
