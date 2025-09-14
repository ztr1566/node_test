const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mydataSchema = new Schema({
  usernamee: String,
});

module.exports = mongoose.model("Mydataa", mydataSchema);
