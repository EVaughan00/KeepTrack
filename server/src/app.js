const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const authPolicy = require('../controller/authPolicy')

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

const port = process.env.PORT || 8081

const server = app.listen(port, function () {
  console.log('server running on port 8081')
})

// var https = require('https')
// var fs = require('fs')
// var options = {
//  key: fs.readFileSync('../certs/key.pem'),
//  cert: fs.readFileSync('../certs/certificate.pem')
// }
// var server = https.createServer(options, app).listen(port)

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function (data) {
    var token = data.token
    var store = authPolicy.validateToken(token)
    if (store !== false) {
      io.emit('MESSAGE', data, store)
    }
  })
})
