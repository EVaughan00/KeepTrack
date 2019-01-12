var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CakeSchema = new Schema({
  customerName: String,
  dueDate: String,
  cake: String,
  size: String,
  message: String
});

var Cake = mongoose.model("Cake", CakeSchema);

module.exports = Cake;
