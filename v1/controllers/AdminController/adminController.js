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
const { ModelSignupUser } = require("../../../models/userModels/ModelSignup");

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
exports.Pagination_transaction = Pagination_transaction;
exports.transaction_of_last_days = transaction_of_last_days;
exports.filter_Bydatefun = filter_Bydatefun;
exports.Totalfee_of_last_days = Totalfee_of_last_days;
exports.Filter_transac_by_class = Filter_transac_by_class;

async function helloadmin(req, res) {
  res.send("hello admin");
}

async function Filter_transac_by_class(req, res) {
  try {
    const class_id = req.query.class_id;
    if (!class_id) throw "please insert valid id";
    if (class_id.length < 24) throw " invalid id please check";

    console.log(class_id);
    const transac = await ModelTransaction.find({ class_id: class_id });
    console.log(transac);
    if (transac.length === 0) throw "  transaction not found";
    res.status(200).send(`total: ${transac.length} ${transac} `);
  } catch (error) {
    res.status(400).send("Something not right " + error);
  }
}


async function Totalfee_of_last_days(req, res) {
  try {
    var Total = []
    for (let index = 1; index <= 4; index++) {
      let date = new Date();

      if (index === 1) {
        date.setDate(date.getDate() - 7);
        console.log(date, "date when index 1");
      } else if (index === 2) {
        date.setDate(date.getDate() - 30);
        console.log(date, "date when index 2");
      } else if (index === 3) {
        date.setHours(0, 0, 0);
        console.log(date.toString(), "tdate when index 3");
      }else if (index === 4){
        const data = await ModelTransaction.findOne()
        date = new Date(data.createdAt)
        // console.log(data.createdAt,"created");
      }
      console.log(date, "find side");
      const findPay = await ModelTransaction.find({
        updatedAt: { $gte: date },
      });
      var totalFeePaid = findPay.reduce(function (sum, fee) {
        const updatedSum = sum + fee.fee_amount;
        return updatedSum;
      }, 0);
       Total.push(totalFeePaid)
    }
    //----------------------- loop over
    let PastDaysTotal = {
      Today: Total[2],
      Last7Days: Total[0],
      Last30Days: Total[1],
      GrandTotal: Total[3],
    };

    console.log(PastDaysTotal, "fee total obj");
    console.log(totalFeePaid, "total");
    res.status(200).send("totalFeePaid: " + JSON.stringify(PastDaysTotal));
  } catch (error) {
    res.status(400).send("Something not right " + error);
  }




}

async function filter_Bydatefun(req, res) {
  try {
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;

    const startDate = new Date(from_date);
    const endDate = new Date(to_date);

    endDate.setDate(endDate.getDate() + 1);
    console.log(startDate, "startdate");
    console.log(endDate, "endate");

    const find_bydate = await ModelSignupUser.find({
      updatedAt: { $gte: startDate, $lte: endDate },
    });

    if (find_bydate.length === 0)
      throw " transactions not found of this date period";
    res.status(200).send("total :" + find_bydate.length + find_bydate);
  } catch (error) {
    res.status(400).send("Something not right " + error);
  }
}

async function transaction_of_last_days(req, res) {
  try {
    const total_days = req.query.days;

    if(total_days == 0 ) throw  " please enter valid number of day"
    console.log(typeof total_days);
    let date = new Date();
    date.setDate(date.getDate() - total_days);
    console.log(date);
    const findPay = await ModelTransaction.find({
      updatedAt: { $lte: new Date(), $gte: date },
    });
    if (findPay.length === 0)
      throw ` no transactions are available of last ${total_days} days`;
    res.status(200).send("total: " + findPay.length + findPay);
  } catch (error) {
    res.status(400).send("Something not right " + error);
  }
}

async function Pagination_transaction(req, res) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    if (page == 0 || limit == 0)
      throw " page or limit value must greater than 0";

    // console.log(page,limit);
    const transac_history = await ModelTransaction.find()
      .limit(limit)
      .skip((page - 1) * limit);
    // console.log(transac_history);
    if (transac_history.length == 0) throw " no more entries are available";

    // transac_history.forEach(function(element){
    //   console.log(element.class_id);

    // })

    res.status(201).send("total : " + transac_history.length + transac_history);
  } catch (error) {
    res.status(401).send("Something not right" + error);
  }
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

    const today = new Date();
    const year = today.getFullYear().toString();
    const yearcode = parseInt(year.slice(-2));
    const usercount = await ModelNewUser.find({ role: 3 }).count();
    const count = (usercount + 1).toString();
    const usercode = count.padStart(2, 0);
    // console.log(usercode);

    const finduser = await ModelNewUser.findOne({ email: email });
    console.log(finduser);
    if (finduser) throw " User Already Registered";
    User_data.password = await bcrypt.hash(User_data.password, salt);
    // const student_img = req.file.path;
    // Student_Data.student_img = student_img;

    Object.assign(User_data, { username: "PS" + yearcode + usercode });

    const Student_Saved = await ModelNewUser(User_data).save();
    res.status(201).send("Student Registered" + Student_Saved);
  } catch (error) {
    console.log(error);
    res.status(400).send("error" + error);
  }
}


// try {
//   var Total = []
//   for (let index = 1; index <= 4; index++) {
//     let date = new Date();

//     if (index === 1) {
//       date.setDate(date.getDate() - 7);
//       console.log(date, "date when index 1");
//     } else if (index === 2) {
//       date.setDate(date.getDate() - 30);
//       console.log(date, "date when index 2");
//     } else if (index === 3) {
//       date.setHours(0, 0, 0);
//       console.log(date.toString(), "tdate when index 3");
//     }else if (index === 4){
//       const data = await ModelTransaction.findOne()
//       date = new Date(data.createdAt)
//       // console.log(data.createdAt,"created");
//     }
//     console.log(date, "find side");
//     const findPay = await ModelTransaction.find({
//       updatedAt: { $gte: date },
//     });
//     var totalFeePaid = findPay.reduce(function (sum, fee) {
//       const updatedSum = sum + fee.fee_amount;
//       return updatedSum;
//     }, 0);
//      Total.push(totalFeePaid)
//   }
//   //----------------------- loop over
//   let PastDaysTotal = {
//     Today: Total[2],
//     Last7Days: Total[0],
//     Last30Days: Total[1],
//     GrandTotal: Total[3],
//   };

//   console.log(PastDaysTotal, "fee total obj");
//   console.log(totalFeePaid, "total");
//   res.status(200).send("totalFeePaid: " + JSON.stringify(PastDaysTotal));
// } catch (error) {
//   res.status(400).send("Something not right " + error);
// }
