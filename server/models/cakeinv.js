var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CakeInvSchema = new Schema({
  LCC: Number,
  SCC: Number,
  SMint: Number,
  LMint: Number,
  SCBC: Number,
  LCBC: Number,
  SCHIP: Number,
  LCHIP: Number,
  SCD: Number,
  LCD: Number,
  SCOF: Number,
  LCOF: Number,
  SSP: Number,
  LSP: Number,
  SCND: Number,
  LCND: Number,
  SPBP: Number,
  LPBP: Number,
  SMD: Number,
  LMD: Number,
  STDD: Number,
  LTDD: Number
});

var CakeInv = mongoose.model("CakeInv", CakeInvSchema);

module.exports = CakeInv;
