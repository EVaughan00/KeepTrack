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
  in1: String,
  in2: String,
  in3: String,
  in4: String,
  in5: String,
  in6: String,
  in7: String,
  in8: String,
  in9: String,
  extra1: String,
  extra2: String,
  extra3: String,
  store: String
});

var Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
