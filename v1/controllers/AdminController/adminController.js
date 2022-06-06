const { ModelClass } = require("../../../models/adminModels/ModelClass");
const {
  ModelSeqenceStudent,
} = require("../../../models/adminModels/ModelSequence");
const { ModelNewUser } = require("../../../models/adminModels/ModelStudent");
const Models = require("../../../models/index");
const bcrypt = require("bcrypt");
const {
  ModelNewStudent,
} = require("../../../models/adminModels/ModelAddStudent");
const req = require("express/lib/request");
const {
  ModelTransaction,
} = require("../../../models/adminModels/ModelTransaction");
const res = require("express/lib/response");
const mongoose = require("mongoose");

exports.Newstd_Userfun = Newstd_Userfun;
exports.Add_Classfun = Add_Classfun;
exports.helloadmin = helloadmin;
exports.Student_addfun = Student_addfun;
exports.User_detailsfun = User_detailsfun;
exports.get_classes = get_classes;
exports.Trans_historyfun = Trans_historyfun;
exports.AllStudentOfOneClass = AllStudentOfOneClass;
exports.SingleUserDetail = SingleUserDetail;
exports.Update_userfun = Update_userfun;
exports.Delete_Userfun = Delete_Userfun;
exports.Update_classfun = Update_classfun;
exports.Delete_classfun = Delete_classfun;

async function helloadmin(req, res) {
  res.send("hello admin");
}

async function Delete_classfun(req, res) {
  try {
    const class_id = req.params.id;
    // console.log(_id);
    const find = await ModelClass.findOne({ _id: class_id });
    if (!find) throw " class does  not exist ";

    const deleted = await ModelClass.findByIdAndDelete(class_id);
    res.status(201).send("Class deleted successfully ");
  } catch (error) {
    // console.log("something not right" + error);
    res.status(401).send("Something not right" + error);
  }
}

async function Update_classfun(req, res) {
  try {
    const class_id = req.params.id;

    const find = await ModelClass.findOne({ _id: class_id });
    if (!find) throw " class does  not exist ";

    const UserUpdated = await ModelClass.findByIdAndUpdate(class_id, req.body, {
      new: true,
    });
    res.status(201).send("class Updated successfully");
  } catch (error) {
    // console.log("something not right" + error);
    res.status(401).send("Something not right" + error);
  }
}

async function Delete_Userfun(req, res) {
  try {
    const user_id = req.params.id;
    console.log(user_id);

    const find = await ModelNewUser.findOne({ _id: user_id });
    if (!find) throw " User does  not exist ";

    const deleted = await ModelNewUser.findByIdAndDelete(user_id);
    res.status(201).send("User deleted successfully ");
  } catch (error) {
    // console.log("something not right" + error);
    res.status(401).send("Something not right" + error);
  }
}

async function Update_userfun(req, res) {
  try {
    const user_id = req.params.id;
    const body = req.body;
    console.log(body);
    const find = await ModelNewUser.findOne({ _id: user_id });
    if (!find) throw " User does  not exist ";

    // const UserUpdated = await ModelNewUser.updateOne({_id:user_id},$set:{})
    const UserUpdated = await ModelNewUser.findByIdAndUpdate(
      user_id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send("User Updated successfully");
  } catch (error) {
    // console.log("something not right" + error);
    res.status(401).send("Something not right" + error);
  }
}

async function Trans_historyfun(req, res) {
  try {
    // console.log(req.body);
    const Transac_details = req.body;

    const id = Transac_details.student_id;
    const fee = Transac_details.fee_amount;
    const feetype = Transac_details.fee_type;

    const findfee = await ModelClass.findOne({ _id: Transac_details.class_id });
    const add_fee = findfee.addmission_fee;
    const mon_fee = findfee.monthly_fee;

    const remaining_fee = await ModelNewStudent.findOne({ _id: id });
    console.log(remaining_fee.due_fee);
    const due_fee = remaining_fee.due_fee;

    if (feetype == 1) {
      const balancefee = add_fee - fee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: balancefee,
      });
    } else if (feetype == 2) {
      const balancefee = mon_fee - fee;
      const total_fee = due_fee + balancefee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: total_fee,
      });
    } else if (feetype == 3) {
      const total_due = due_fee - fee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: total_due,
      });
    }

    const Transac_saved = await ModelTransaction(Transac_details).save();
    res.status(201).send("Transac_saved" + Transac_saved);
  } catch (error) {
    res.status(401).send(error);
  }
}

async function SingleUserDetail(req, res) {
  const user_id = req.body.user_id;
  // console.log(user_id);

  //  try {

  //   const data = await ModelNewStudent.aggregate([
  //     {
  //       $match:{
  //        user_id:mongoose.Types.ObjectId(user_id)
  //       }
  //     },
  //     {
  //       $lookup:{
  //         from:"registered_users",
  //         localField:"user_id",
  //         foreignField:"_id",
  //         as:"ShowUser"
  //       },

  //     }
  //     // {
  //     //   $project:{
  //     //    User:"$ShowUser.email",

  //     //   },
  //     // },
  //   ])
  //   res.status(201).send(data)
  // } catch (error) {
  //   res.status(400).send(error)
  // }

  try {
    const userdata = await ModelNewUser.find({ _id: user_id }, { password: 0 });
    // await ModelNewStudent.findOne({ user_id: user_id }).populate('user_id')
    res.status(201).send(userdata);
  } catch (error) {
    res.status(401).send(error);
  }
}

async function AllStudentOfOneClass(req, res) {
  const classid = req.body.class_id;

  try {
    const OneStd_Data = await ModelNewStudent.find(
      { class_id: classid },
      { class_id: 0 }
    );
    //  console.log(OneStd_Data[0]);

    res.status(201).send(OneStd_Data);
  } catch (error) {
    res.status(401).send(error);
  }
}

async function get_classes(req, res) {
  try {
    const get_classes = await ModelClass.find(
      {},
      { addmission_fee: 0, monthly_fee: 0 }
    );
    res.status(201).send(get_classes);
  } catch (error) {
    res.status(401).send(error);
  }
}

async function User_detailsfun(req, res) {
  try {
    const userDetails = await ModelNewUser.find({ role: 3 }, "name mobile_num");
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(401).send(error);
  }
}

async function Student_addfun(req, res) {
  try {
    // console.log(req.body);
    const body = req.body;

    const className = await ModelClass.findById({ _id: body.class_id });
    //  console.log(className);

    class_count = className.class;

    const finduser = await ModelNewStudent.find({
      user_id: mongoose.Types.ObjectId(body.user_id),
      class_id: body.class_id,
    });
    // console.log(finduser, "find user");
    if (finduser.length > 0) {
      console.log("already");
      throw "student already registered with same class";
    } else if (finduser.length == 0) {
      const countt = await ModelNewStudent.find({
        class_id: body.class_id,
      }).count();
      // console.log(countt,"same class count");

      Object.assign(body, { roll_num: class_count * 1000 + 1 + countt });
      const savedata = await ModelNewStudent(body).save();
      res.status(201).send("Student added successfully" + savedata);
    }
  } catch (error) {
    res.status(401).send(error);
  }
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
    const email = User_data.email;
    // const mobile_num  = User_data.mobile_num
    // console.log(User_data);

    const finduser = await ModelNewUser.findOne({ email: email });
    console.log(finduser);
    if (finduser) throw " User Already Registered";
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
