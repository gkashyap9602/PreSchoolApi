const { ModelClass } = require("../../../models/adminModels/ModelClass");
const {
  ModelSeqenceStudent,
} = require("../../../models/adminModels/ModelSequence");
const { ModelNewUser } = require("../../../models/adminModels/ModelStudent");
const Models = require("../../../models/index");
const bcrypt = require("bcrypt");

exports.Newstd_Userfun = Newstd_Userfun;
exports.Add_Classfun = Add_Classfun;
exports.helloadmin = helloadmin;
exports.Student_addfun = Student_addfun;
exports.User_detailsfun = User_detailsfun;

async function helloadmin(req, res) {
  res.send("hello admin");
}

async function User_detailsfun(req, res) {


const userDetails = await ModelNewUser.find()
res.status(200).send(userDetails)

  // const user_details = await ModelNewUser.aggregate([
  //   {
  //     $lookup: {
  //       from: "registered_users",
  //       localField: "_id",
  //       foreignField: "User_id",
  //       as: "UsersData",
  //     },
  //   },
  //   {
  //           $project: {
  //             firstname: "$fname",
  //             useremail: "$email",
            
  //           },
  //         },
  // ]);
  // res.status(201).send(user_details)
}

async function Student_addfun(req, res) {
  console.log(req.body);
  // console.log("hye");
}
async function Add_Classfun(req, res) {
  try {
    let Class_Data = req.body;
    const AllClass = await ModelClass.findOne({ class: Class_Data.class });
    if (AllClass) throw " class already registered";
    const Data_Saved = await ModelClass(Class_Data).save();
    res.status(201).send("Class add Successfully" + Data_Saved);
  } catch (error) {
    res.status(401).send("err" + error);
  }
}
async function Newstd_Userfun(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);

    const User_data = req.body;
    console.log(User_data);
    User_data.password = await bcrypt.hash(User_data.password, salt);
    // const student_img = req.file.path;
    // Student_Data.student_img = student_img;
    const Student_Saved = await ModelNewUser(User_data).save();

    res.status(201).send("Student Registered" + Student_Saved);
  } catch (error) {
    console.log(error);
    res.status(400).send("error" + error);
  }
}
