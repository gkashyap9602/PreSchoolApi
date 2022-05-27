const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/index')
// const UploadFile = require('../../../Services/index')
const { FileUpload } = require('../../../Services/index')

router.get('/helloadmin',Controller.AdminController.helloadmin)
router.post('/addstudent',FileUpload.multerAdmin.single('student_img'),Controller.AdminController.Student_addfun)
router.post('/addclass',FileUpload.multerAdmin.single('img'),Controller.AdminController.Add_Classfun)
router.post('/feeupdate',FileUpload.multerAdmin.single('img'),Controller.AdminController.Fee_Update)

module.exports = router;