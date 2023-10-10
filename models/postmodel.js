const mongoose = require("mongoose");

const postsch = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  }

});
module.exports = mongoose.model("post",postsch);