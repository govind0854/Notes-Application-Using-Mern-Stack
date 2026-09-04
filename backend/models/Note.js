const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  content:{
    type:String,
    required:true
  },

  category:{
    type:String,
    default:"General"
  },

  reminder:{
    type:Date
  },

  shareId:{
    type:String
  },

  deleted:{
    type:Boolean,
    default:false
  },

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true});

module.exports = mongoose.model("Note",noteSchema);