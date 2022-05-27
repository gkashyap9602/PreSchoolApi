const { ModelClass } = require("../../../models/adminModels/ModelClass");
const {
  ModelFeeUpdate,
} = require("../../../models/adminModels/ModelFeeUpdate");
const { ModelSeqenceStudent } = require("../../../models/adminModels/ModelSequence");
const { ModelNewStudent } = require("../../../models/adminModels/ModelStudent");
const Models = require('../../../models/index')

exports.Student_addfun = Student_addfun;
exports.Add_Classfun = Add_Classfun;
exports.helloadmin = helloadmin;
exports.Fee_Update = Fee_Update;

async function helloadmin(req, res) {
  res.send("hello admin");
}

async function Fee_Update(req, res) {
  try {
    const Fee_data = req.body;
    const Saved = await ModelFeeUpdate(Fee_data).save();
    res.status(201).send("fee updated");
  } catch (error) {
    res.status(401).send("error" + error);
  }
}

async function Add_Classfun(req, res) {
  try {

    let Class_Data = req.body;
    const Data_Saved = await ModelClass(Class_Data).save()
    res.status(201).send("Class add Successfully");
  } catch (error) {
    res.status(401).send("err" + error);
  }

}
async function Student_addfun(req, res) {
  try {
  
   const result = await ModelSeqenceStudent.findOne({Student_id:"Student_id"})
   const seq_num = result.seq_num + 1
    
    const Student_Data = req.body;
    Object.assign(Student_Data,{roll_num:2000 + seq_num})
    const student_img = req.file.path;
    Student_Data.student_img = student_img;
    const Student_Saved = await ModelNewStudent(Student_Data).save();
    const Student_id = Student_Saved._id
    console.log(Student_id)

    const ree = await ModelSeqenceStudent.updateOne(
    { Student_id:"Student_id" },
    {$inc:{seq_num:1}})
     
    // seq_num.Student_id = Student_id 
    // const SeqData = await ModelSeqenceStudent(seq_num).save()
         
    res.status(201).send("Student Registered" + Student_Saved);
  } catch (error) {
    console.log(error);
    res.status(400).send("error" + error);
  }
}
