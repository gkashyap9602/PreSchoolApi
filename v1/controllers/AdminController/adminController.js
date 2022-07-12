const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Models = require("../../../models/index");

const { ModelClass } = require("../../../models/adminModels/ModelClass");
const { ModelNewUser } = require("../../../models/adminModels/ModelStudent");
const {ModelNewStudent,} = require("../../../models/adminModels/ModelAddStudent");
const req = require("express/lib/request");
const { ModelTransaction,} = require("../../../models/adminModels/ModelTransaction");
const res = require("express/lib/response");
const UTILS = require("../../../Utils/messages");
const {error_Object,response_Object,object_id_check} = require("../../../Utils/helperFun");

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

// require('express-async-errors')

async function helloadmin(req, res) {
  res.send("hello admin");
}

async function Filter_transac_by_class(req, res) {
  try {
    const class_id = req.params.id;
    const errr = object_id_check(class_id);
    if (errr) throw errr;

    console.log(class_id);
    const transactions = await ModelTransaction.find({ class_id: class_id });
    console.log(transactions);
    if (transactions.length === 0)
      throw UTILS.MESSAGES.NO_MORE_ENTRIES_ARE_AVAILABLE;
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function Totalfee_of_last_days(req, res) {
  try {
    const class_id = req.query.class_id;

    const from_date = req.query.from_date;
    const to_date = req.query.to_date;

    const startDate = new Date(from_date);
    const endDate = new Date(to_date);

    // endDate.setDate(endDate.getDate() + 1);
    // console.log(startDate, "startdate");

    
    // console.log(class_id.length);
    // const errr = object_id_check(class_id);
    // if (errr) throw errr;

    // console.log(class_id);
    var match_Condition;
    var Total = [];

    for (let index = 1; index <= 4; index++) {
      let date = new Date();

      if (index === 1) {
        date.setDate(date.getDate() - 7);
        // console.log(date, "date when index 1");
      } else if (index === 2) {
        date.setDate(date.getDate() - 30);
        // console.log(date, "date when index 2");
      } else if (index === 3) {
        date.setHours(0, 0, 0);
        // console.log(date.toString(), "tdate when index 3");
      } else if (index === 4) {
        const data = await ModelTransaction.findOne();
        date = new Date(data.createdAt);
        // console.log(data.createdAt, "created index 4");
      }

      if (!class_id && !from_date && !to_date) {
        console.log("if");
        match_Condition = { $match: { updatedAt: { $gte: date } } };
      } else if(class_id && !from_date && !to_date){
        console.log("else if 1");
        match_Condition = {
          $match: {
            updatedAt: { $gte: date },
            class_id: mongoose.Types.ObjectId(class_id),
          },
        };
      }else if(class_id && from_date && to_date){
        console.log("else if 2");
        match_Condition = {
          $match: {
            updatedAt: { $gte: startDate, $lte: endDate },
            class_id: mongoose.Types.ObjectId(class_id),
          },
        };
      }else if(!class_id && from_date && to_date){
        throw "Please Enter Class Id with Session (from and to date)"
      }
      console.log(match_Condition,"match")
      var result = await ModelTransaction.aggregate([
      
        match_Condition,
        {
          $group: {
            _id: null,
            total: {
              $sum: "$fee_amount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
          },
        },
      ]);

      if (result.length === 0) {
        result.push(0);
      }
      Total.push(result);
    }
    console.log(match_Condition,"match")

    let PastDaysTotal = {
      Today: Total[2],
      Last7Days: Total[0],
      Last30Days: Total[1],
      GrandTotal: Total[3],
    };
    // console.log(result, "result");
    console.log(Total, "total ar");
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: PastDaysTotal,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error,Status_Code : 400 });
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

    const transactions = await ModelTransaction.find({
      updatedAt: { $gte: startDate, $lte: endDate },
    });

    if (transactions.length === 0)
      throw UTILS.MESSAGES.NO_MORE_ENTRIES_ARE_AVAILABLE;
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function transaction_of_last_days(req, res) {
  try {
    const total_days = req.query.days;

    if (total_days == 0) throw UTILS.MESSAGES.PLEASE_ENTER_VALID_NUMBER_OF_DAY;
    console.log(typeof total_days);
    let date = new Date();
    date.setDate(date.getDate() - total_days);
    console.log(date);
    const transactions = await ModelTransaction.find({
      updatedAt: { $lte: new Date(), $gte: date },
    });
    if (transactions.length === 0)
      throw UTILS.MESSAGES.NO_MORE_ENTRIES_ARE_AVAILABLE;
    // "total: " + findPay.length + findPay
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function Pagination_transaction(req, res) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    if (page == 0 || limit == 0)
      throw UTILS.MESSAGES.PAGE_OR_LIMIT_VALUE_MUST_GREATER_THAN_0;

    // console.log(page,limit);
    const transaction_history = await ModelTransaction.find()
      .limit(limit)
      .skip((page - 1) * limit);
    // console.log(transac_history);
    if (transaction_history.length == 0)
      throw UTILS.MESSAGES.NO_MORE_ENTRIES_ARE_AVAILABLE;

    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: transaction_history.length,
      transaction_history,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function Delete_classfun(req, res) {
  try {
    const class_id = req.params.id;
    const errr = object_id_check(class_id);
    if (errr) throw errr;
    // console.log(_id);
    const find = await ModelClass.findOne({ _id: class_id });
    if (!find) throw UTILS.MESSAGES.DOES_NOT_EXIST;

    const deleted = await ModelClass.findByIdAndDelete(class_id);
    res.status(202).send({ message: UTILS.MESSAGES.DELETED_SUCCESSFULLY,Status_Code : 202});
  } catch (error) {
    // console.log("something not right" + error);
    res.status(400).send({ message: error,Status_Code : 400});
  }
}

async function Update_classfun(req, res) {
  try {
    const class_id = req.params.id;
    const errr = object_id_check(class_id);
    if (errr) throw errr;

    const find = await ModelClass.findOne({ _id: class_id });
    if (!find) throw UTILS.MESSAGES.DOES_NOT_EXIST;

    const UserUpdated = await ModelClass.findByIdAndUpdate(class_id, req.body, {
      new: true,
    });
    res.status(201).send({ message: UTILS.MESSAGES.UPDATED_SUCCESSFULLY,Status_Code : 201 });
  } catch (error) {
    // console.log("something not right" + error);
    res.status(400).send({ message: error,Status_Code : 400});
  }
}

async function Delete_Userfun(req, res) {
  try {
    const user_id = req.params.id;
    // console.log(user_id.length);
    const errr = object_id_check(user_id);
    if (errr) throw errr;

    console.log(user_id);
    const find = await ModelNewUser.findOne({ _id: user_id });
    if (!find) throw UTILS.MESSAGES.DOES_NOT_EXIST;

    const deleted = await ModelNewUser.findByIdAndDelete(user_id);
    res.status(200).send({ message: UTILS.MESSAGES.DELETED_SUCCESSFULLY,Status_Code : 200 });
  } catch (error) {
    // console.log("something not right" + error);
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function Update_userfun(req, res) {
  try {
    const user_id = req.params.id;
    const errr = object_id_check(user_id);
    if (errr) throw errr;

    const body = req.body;
    console.log(body);
    const find = await ModelNewUser.findOne({ _id: user_id });
    if (!find) throw UTILS.MESSAGES.DOES_NOT_EXIST;

    const UserUpdated = await ModelNewUser.findByIdAndUpdate(
      user_id,
      req.body,
      { new: true }
    );
    res.status(201).send({
      message: UTILS.MESSAGES.UPDATED_SUCCESSFULLY,
      Status_Code : 201,
    });
  } catch (error) {
    // console.log("something not right" + error);
    res.status(400).send({ message: error,Status_Code : 400});
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
    if(!findfee) throw "class not exist"
    const add_fee = findfee.addmission_fee;
    const mon_fee = findfee.monthly_fee;

    const remaining_fee = await ModelNewStudent.findOne({ _id: id });
    if(!remaining_fee) throw "student not exist"
    console.log(remaining_fee.due_fee);
    const due_fee = remaining_fee.due_fee;

    if (feetype === 1) {
      const balancefee = add_fee - fee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: balancefee,
      });
    } else if (feetype === 2) {
      const balancefee = mon_fee - fee;
      const total_fee = due_fee + balancefee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: total_fee,
      });
    } else if (feetype === 3) {
      const total_due = due_fee - fee;
      const Updatefee = await ModelNewStudent.findByIdAndUpdate(id, {
        due_fee: total_due,
      });
    }

    const Transac_saved = await ModelTransaction(Transac_details).save();

    res.status(201).send({
      message: UTILS.MESSAGES.TRANSACTION_SUCCESSFULL,
      Status_Code : 201,
      // result:Transac_saved
    });
  } catch (error) {
    console.log(error.name, "err name");
    if (error.name === "ValidationError" || error.code === 11000) {
      // Duplicate username
      res.status(422).send({ message: error.message,Status_Code : 422});
    } else {
      res.status(400).send({ message: error ,Status_Code : 400});
    }
  }
}

async function SingleUserDetail(req, res) {
  try {
    const user_id = req.params.id;
    const errr = object_id_check(user_id);
    if (errr) throw errr;
    // console.log(user_id);
    const userdata = await ModelNewUser.find({ _id: user_id }, { password: 0 });
    if(userdata.length === 0) throw "User Not Exist"
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: userdata,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400});
  }
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
}

async function AllStudentOfOneClass(req, res) {
  try {
    const classid = req.params.id;
    console.log(classid);
    const errr = object_id_check(classid);
    if (errr) throw errr;

    const OneStdudent_Data = await ModelNewStudent.find(
      { class_id: classid },
      { class_id: 0 }
    );
    if(OneStdudent_Data.length === 0) throw "Class Not Exist"
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: OneStdudent_Data,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function get_classes(req, res) {
  try {
    const get_classes = await ModelClass.find(
      {},
      { addmission_fee: 0, monthly_fee: 0 }
    );
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: get_classes,
    });
  } catch (error) {
    res.status(401).send({ message: error,Status_Code : 401 });
  }
}

async function User_detailsfun(req, res) {
  try {
    const users_details = await ModelNewUser.find(
      { role: 3 },
      "father_name mobile_num"
    );
    res.status(200).send({
      message: UTILS.MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
      Status_Code : 200,
      result: users_details,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}

async function Student_addfun(req, res) {
  try {
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
      throw UTILS.MESSAGES.STUDENT_ALREADY_REGISTERED_WITH_SAME_CLASS;
    } else if (finduser.length == 0) {
      const countt = await ModelNewStudent.find({
        class_id: body.class_id,
      }).count();
      // console.log(countt,"same class count");

      Object.assign(body, { roll_num: class_count * 1000 + 1 + countt });
      const Store_Student = await ModelNewStudent(body).save();
      res.status(201).send({
        message: UTILS.MESSAGES.STUDENT_REGISTERED_SUCCESSFULLY,
        Status_Code : 201,
        result: Store_Student,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
  }
}
async function Add_Classfun(req, res) {
  try {
    let Class_Data = req.body;
    const AllClass = await ModelClass.findOne({ class: Class_Data.class});
    if (AllClass) throw UTILS.MESSAGES.CLASS_ALREADY_REGISTERED;
    const Data_Saved = await ModelClass(Class_Data).save();
    res.status(201).send({
      message: UTILS.MESSAGES.CLASS_REGISTERED_SUCCESSFULLY,
      Status_Code : 201,
      result: Data_Saved,
    });
  } catch (error) {
    res.status(400).send({ message: error,Status_Code : 400 });
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
    if (finduser) throw UTILS.MESSAGES.USER_ALREADY_REGISTERED;
    User_data.password = await bcrypt.hash(User_data.password, salt);
    // const student_img = req.file.path;
    // Student_Data.student_img = student_img;

    Object.assign(User_data, { username: "PS" + yearcode + usercode });

    const Student_Saved = await ModelNewUser(User_data).save(
      function (err,success) {
      // console.log(success,"success");
      if (err) {
        console.log(err.name, "err");
        // console.log(err.code, "err");
        if (err.name === "MongoServerError" || err.code === 11000) {
          // Duplicate username
          return res
            .status(422)
            .send({
              message: UTILS.MESSAGES.NUMBER_ALREADY_REGISTERED,
              Status_Code : 422
             });
        }else{
          return res.status(400).send({ 
            message: err.message,
            Status_Code : 400
          });
        }
      } else {
        console.log("sucess");
        // {
        //   message: UTILS.MESSAGES.USER_REGISTERED_SUCCESSFULLY,
        //   Status_Code : 201,
        //   result: success,
        // }
        const errnew = new error_Object(UTILS.MESSAGES.USER_REGISTERED_SUCCESSFULLY,201,"User register successfully")
        return res.status(201).send(errnew);
      }
    });
    // res.status(201).send("Student Registered " + Student_Saved);
  } catch (error) {
    console.log(error);
    res.status(400).send({
       message: error ,
       Status_Code : 400,
      });
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
