const mongoose = require("mongoose");
const { ModelSignupUser } = require("../userModels/ModelSignup");
const Schema = mongoose.Schema;
const NewClassSchema = new Schema({
  class: {
    type: Number,
    required: true,
  },
  class_code: {
    type: String,
  },
  addmission_fee: {
    type: Number,
    required: true,
  },
  monthly_fee: {
    type: Number,
    required: true,
  },
});

const ModelClass = new mongoose.model("Class_Or_Cource", NewClassSchema);

module.exports = { ModelClass };
