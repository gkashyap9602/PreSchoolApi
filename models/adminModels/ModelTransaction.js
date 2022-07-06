const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewTransactionSchema = new Schema({
  fee_type: {
    type: Number,
    enum: [1,2,3,4],
    required:true
  },
  fee_amount: {
    type: Number,
    required:true
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "new_students",
  },
  class_id: {
    type: mongoose.Types.ObjectId,
    ref: "new_students",
  },
},
{
    timestamps:true
}
);

const ModelTransaction = new mongoose.model(
  "Transaction_history",
  NewTransactionSchema
);

module.exports = { ModelTransaction };
