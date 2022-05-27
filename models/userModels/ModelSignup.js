const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NewUserSchema = new Schema ({
    fname : {
        type:String,
        required:true
        
    },
    lname :{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobile_num:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    IsDeleted:{
        type:Boolean,default:false,
    },
    Otp_code:{
        type:Number
    },
    Profile_img:{
        type:String
    }

},
   {
    timestamps:true
   }

)


const ModelSignupUser = new mongoose.model('NewUsers',NewUserSchema)

module.exports = {ModelSignupUser}