const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewStudentSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  email:{
     type:String,
     required:true
  },
  password:{
   type: String,
   required:true
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  class: {
    type: String,
    // required: true,
  },
  religion: {
    type: String,
  },
  joining_date: {
    type: String,
  },
  mobile_num: {
    type: Number,
    // required: true,
    unique: true,
  },
  student_img: {
    type: String,
  },
  section: {
    type: String,
  },
  role:{
      type:String,default:3
  },
  roll_num:{
    type:Number, 
  },

});

const ModelNewStudent = new mongoose.model("NewStudents", NewStudentSchema);
module.exports = { ModelNewStudent };
