const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const User = require('./user');
const saltRounds = 10;

module.exports = {
  hashPassword (password) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);    // console.log('hashing password');
    return hash
  },

  comparePassword (password, current) {
    console.log(password + " " + current);
    return bcrypt.compareSync(password, current)
  }
}
