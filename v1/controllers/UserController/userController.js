const mongoose = require("mongoose");
const Models = require("../../../models/index");
const { ModelSignupUser } = require("../../../models/userModels/ModelSignup");
const { EmailService } = require("../../../Services");
const auth = require("../../../Utils/auth");
const jwt = require("jsonwebtoken");
const {
  Access_token_SecretKey,
  refresh_token_SecretKey,
} = require("../../../config/config");

let refreshTokens = [];

exports.NewUserFun = NewUserFun;
exports.LoginUser = LoginUser;
exports.getdata = getdata;
exports.forgotPasswordfun = forgotPasswordfun;
exports.Change_Passwordfun = Change_Passwordfun;
exports.renew_tokenfun = renew_tokenfun;



async function getdata(req, res) {
  res.send("hello user");
}


async function renew_tokenfun(req, res) {
  try {
    const refresh_token = req.body.refresh_token;
    console.log(refresh_token);

    if (refresh_token || refreshTokens.includes(refresh_token)) {
      jwt.verify(
        refresh_token,
        refresh_token_SecretKey,
        function (err, decode) {
          if (err) throw res.status(401).send("token not valid or expire");
          const New_Access_token = auth.genAuthToken(decode._id);
          res
            .status(201)
            .send(`New_Access_Token is ${New_Access_token.Access_token}`);
        }
      );
    } else {
      res.status(400).send("user not authenticated");
    }
  } catch (error) {
    res.status(404).send("something wrong");
  }
}

// change account Password With Otp Verification
async function Change_Passwordfun(req, res) {
  try {
    const new_password = req.body.new_password;
    const Otp_code = req.body.Otp_code;
    const email = req.params.email;
    // find if user exist or not
    const FindUser = await ModelSignupUser.findOne({
      email: email,
    });

    if (!FindUser) throw "Email does not exist";

    if (FindUser.Otp_code == Otp_code) {
      // find if user matched in database and Update Password
      const ChangePassword = await ModelSignupUser.updateOne(
        { email: email },
        { $set: { password: new_password }, new: true }
      );

      res.status(201).send("Password change Successfully");
    } else {
      res.status(401).send("Otp Not Matched");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something wrong");
  }
}

// forgot password with email
async function forgotPasswordfun(req, res) {
  try {
    const Otp_mail = auth.random_Otpfun();
    const email = req.body.email;
    // const Otp_code = req.body.Otp_code;
    // find if user exist or not
    const FindUser = await ModelSignupUser.findOne({ email: email });
    if (!FindUser) throw " Email does not exist";

    const Otp = JSON.stringify(Otp_mail);

    if (FindUser) {
      await ModelSignupUser.updateOne(
        { email: email },
        { $set: { Otp_code: Otp_mail } }
      );
      // Send Otp to the User's Email With Nodemailer Function
      EmailService.mailer(email, Otp);
      res.status(201).send("Otp Send Successfully to " + email);
    } else {
      res.status(401).send("User Not Matched");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error" + error);
  }
}

// register new User
async function NewUserFun(req, res) {
  try {
    //   generate random Otp codes each time
    const Otp_code = auth.random_Otpfun();
    const formdata = req.body;
    // const Profile_img = req.file.path;
    // if (!Profile_img) throw "file not access";
    formdata.Otp_code = Otp_code;
    // formdata.Profile_img = Profile_img;
    //Store New User Details in database
    const UserRegistered = await ModelSignupUser(formdata).save();
    res.status(201).send("User register Successfully" + UserRegistered);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong" + error);
  }
}
// authenticate user with his details and generate jwt Token
async function LoginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // find if user exist or not
    const Userdata = await ModelSignupUser.findOne({ email: email });
    if (!Userdata) throw "email is not valid";
    const user_id = Userdata._id;

    if (Userdata.email == email && Userdata.password == password) {
      //generating jwt token
      const token = auth.genAuthToken(user_id);
      if (!token) throw "token not generated";
      //   console.log(token, "token login side");
      refreshTokens.push(token.refresh_token);
      res
        .status(200)
        .send(
          `hello user Your Access Token Is ${token.Access_token} and refresh Token is ${token.refresh_token}`
        );
    } else {
      res.status(401).send("user is not valid");
    }
  } catch (error) {
    res.status(400).send("something Wrong" + error);
  }
}
