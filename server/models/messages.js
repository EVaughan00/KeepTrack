var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: String,
  user: String
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
