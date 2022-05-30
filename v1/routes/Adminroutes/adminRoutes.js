const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/index')
// const UploadFile = require('../../../Services/index')
const { FileUpload } = require('../../../Services/index')

router.get('/helloadmin',Controller.AdminController.helloadmin)
router.post('/newuser',FileUpload.multerAdmin.single('student_img'),Controller.AdminController.Newstd_Userfun)
router.post('/addclass',FileUpload.multerAdmin.single('img'),Controller.AdminController.Add_Classfun)
router.post('/addstudent',FileUpload.multerAdmin.single('img'),Controller.AdminController.Student_addfun)
router.get('/userdetails',Controller.AdminController.User_detailsfun)

module.exports = router;