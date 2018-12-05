const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const keys = require('../config/keys')

const app = express()

mongoose.connect(keys.mongodb.dbURI)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('../routes/routes')(app)

app.listen(process.env.PORT || 8081)
