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

const server = app.listen(8081, function () {
  console.log('server running on port 8081')
})

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('MESSAGE', data)
  })
})
