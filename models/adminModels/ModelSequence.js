const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewSequenceSchema  = new Schema({

    Student_id:{
        type:String
    },
    seq_num:{
        type:Number
    }
})

const ModelSeqenceStudent = new mongoose.model('SequenceNum',NewSequenceSchema)
module.exports  = { ModelSeqenceStudent}
