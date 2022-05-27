const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewFeeModel = new Schema({
  admission_fee: {
    type: Number,
  },
  monthly_fee: {
    type: Number,
  },
  user_id: {
    type: Number,
  },
});

const ModelFeeUpdate = new mongoose.model("FeeUpdate", NewFeeModel);
module.exports = { ModelFeeUpdate };
