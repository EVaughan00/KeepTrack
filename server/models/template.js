var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  day: String,
  daily1: String,
  daily2: String,
  daily3: String,
  daily4: String,
  daily5: String,
  daily6: String,
  store: String
});

var Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
