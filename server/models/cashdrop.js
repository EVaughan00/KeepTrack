var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CashDropSchema = new Schema({
  drop: Number,
  date: String,
  name: String,
  notes: String,
  store: String
});

var Paperwork = mongoose.model("CashDrop", CashDropSchema);

module.exports = Paperwork;
