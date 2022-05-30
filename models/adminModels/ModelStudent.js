const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewUsersSchema = new Schema({
  fname: {
    type: String,
    // required: true,
  },
  lname: {
    type: String,
  },
  email:{
     type:String,
     required:true
  },
  mobile_num: {
    type: Number,
    // required: true,
    unique: true,
  },
  password:{
   type: String,
   required:true
  },
  User_details:{
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    religion: {
      type: String,
    },
    student_img: {
      type: String,
    },
    role:{
        type:String,default:3
    },
    // roll_num:{
    //   type:Number, 
    // },
  }

});

const ModelNewUser = new mongoose.model("Registered_user", NewUsersSchema);
module.exports = { ModelNewUser };
