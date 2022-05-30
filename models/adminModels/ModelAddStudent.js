const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewStudentSchema = new Schema({
  user_id: {
    type:Schema.Types.ObjectId,ref:"registered_users"
  },
  class_id: {
    type: Schema.Types.ObjectId,ref:"class_or_cources"
  },
  IsActive: {
    type: Boolean,
  },
  fee_status: {
    type: String,
  },
});

const ModelNewStudent  = new mongoose.model('New_Student',NewStudentSchema)

module.exports = {ModelNewStudent} 
