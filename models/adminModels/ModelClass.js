const mongoose = require("mongoose");
const { ModelSignupUser } = require("../userModels/ModelSignup");
const Schema = mongoose.Schema;
const NewClassSchema = new Schema ({

    class:{
        type:String,
        required:true
    },
    addmission_fee:{
      type:Number,
      required:true
    },
    monthly_fee:{
      type:Number,
      required:true
    },

})

const ModelClass = new mongoose.model('Class_Or_Cource',NewClassSchema)

module.exports = {ModelClass}