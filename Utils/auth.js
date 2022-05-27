const jwt = require("jsonwebtoken");
const { Access_token_SecretKey,refresh_token_SecretKey } = require("../config/config");

exports.verify_token = verify_token;
exports.genAuthToken = genAuthToken;
exports.random_Otpfun = random_Otpfun;

// Generate jwt token each time
function genAuthToken(_id) {
    try {
      const Access_token = jwt.sign({ _id: _id }, Access_token_SecretKey,{expiresIn:"30s"});
    //   console.log(Access_token, "Access token generated ");
      const refresh_token = jwt.sign({ _id: _id }, refresh_token_SecretKey,{expiresIn:"7d"});
    //   console.log(refresh_token, "Refresh token generated ");
      return {Access_token,refresh_token}
    } catch (error) {
      console.log(error);
    }
  }
  
  // Verification of jwt token
  function verify_token(req, res, next) {
    let token = req.header("authorization");
    // console.log(token + "verify side token");
    let tokenslice = token.slice(7);
    console.log(tokenslice,"tokenslice");
    jwt.verify(tokenslice, Access_token_SecretKey, function (err, decode) {
      if (err) throw res.status(401).send("token not valid or expire");
    //   if(err) res.send(err)
      req.decode = decode._id;
      next();
    });
  }
  
  function random_Otpfun() {
      const Otp_code = Math.floor(100000 + Math.random() * 900000);
  
      return Otp_code;
      
    }