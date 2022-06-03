const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewUsersSchema = new Schema({
  role:{
    type:Number,enum:[1,2,3]
},
  name: {
    type: String,
  },
  email:{
     type:String,
     required:true
  },
  mobile_num: {
    type: Number,
    // required: true,
    // unique: true,
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
  }

});

const ModelNewUser = new mongoose.model("Registered_user", NewUsersSchema);
module.exports = { ModelNewUser };
