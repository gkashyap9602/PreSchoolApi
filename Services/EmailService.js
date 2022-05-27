const text = require("body-parser/lib/types/text");
const req = require("express/lib/request");
const nodemail = require('nodemailer');

exports.mailer = mailer;

function mailer(email,Otp) {
    const transport = nodemail.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      //require Tls true
      auth: {
        user: "sharukkhan.qxcy.6438@gmail.com",
        pass: "Kashyap@776",
      },
    });
    var mailOptions = {
      from: "sharukkhan.qxcy.6438@gmail.com",
      to: email,
      subject: "Forgot Password ",
      text: "Your Otp Code Is" + " " + Otp,
    };
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("email has been send", info.response);
      }
    });

  }