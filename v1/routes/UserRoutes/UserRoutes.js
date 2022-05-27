const express = require('express')
const router = express.Router()
const Controller = require("../../controllers/index")
const UploadFile = require('../../../Services/index')
const { FileUpload } = require('../../../Services/index')
const { verify_token } = require('../../../Utils/auth')


router.post("/signup",FileUpload.multerUser.single('Profile_img'),Controller.UserController.NewUserFun)
router.post('/login',Controller.UserController.LoginUser)
router.get('/getdata',verify_token,Controller.UserController.getdata)
router.post('/forgotPass',FileUpload.multerUser.single('image'),Controller.UserController.forgotPasswordfun)
router.post('/changePass/:email',FileUpload.multerUser.single('images'),Controller.UserController.Change_Passwordfun)
router.get("/renewToken",FileUpload.multerUser.single('image'),Controller.UserController.renew_tokenfun)




module.exports = router;