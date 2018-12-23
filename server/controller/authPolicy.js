const joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: joi.string().required(),
      email: joi.string().email(),
      password:joi.string().regex(
        new RegExp('^[a-zA-A0-9]{8,32}$')
      )
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
        default: res.status(400).send({
          error: 'Invalid registration information'
        })
      }
    }else {
      next()
    }
  }
}
