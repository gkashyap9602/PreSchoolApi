const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewStudentSchema = new Schema({
  student_name: {
    type: String,
  },
  roll_num: {
    type: Number,
  },
  class: {
    type: Number,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "registered_users",
  },
  class_id: {
    type: Schema.Types.ObjectId,
    ref: "class_or_cources",
  },
  IsActive: {
    type: Boolean,
  },
  due_fee:{
    type:Number,default:0
  }
});

const ModelNewStudent = new mongoose.model("New_Student", NewStudentSchema);

module.exports = { ModelNewStudent };
