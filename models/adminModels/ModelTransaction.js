const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewTransactionSchema = new Schema({
  fee_type: {
    type: Number,
    enum: [1,2,3,4],
  },
  fee_of_month:{
    type:String,
},
  fee_amount: {
    type: Number,
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
