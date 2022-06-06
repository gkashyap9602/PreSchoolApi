const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/index')
// const UploadFile = require('../../../Services/index')
const { FileUpload } = require('../../../Services/index')

router.get('/helloadmin',Controller.AdminController.helloadmin)

router.post('/create/user',FileUpload.multerAdmin.single('student_img'),Controller.AdminController.Newstd_Userfun)
router.patch('/update/user/:id',Controller.AdminController.Update_userfun)
router.delete('/delete/user/:id',Controller.AdminController.Delete_Userfun)

router.post('/create/class',FileUpload.multerAdmin.single('img'),Controller.AdminController.Add_Classfun)
router.patch('/update/class/:id',Controller.AdminController.Update_classfun)
router.delete('/delete/class/:id',Controller.AdminController.Delete_classfun)

router.post('/create/student',FileUpload.multerAdmin.single('img'),Controller.AdminController.Student_addfun)

router.get('/getusers',Controller.AdminController.User_detailsfun)
router.get('/getoneuser',Controller.AdminController.SingleUserDetail)

router.get('/getclasses',Controller.AdminController.get_classes)
router.get('/get/oneclassdata',Controller.AdminController.AllStudentOfOneClass)

router.post('/create/transaction',Controller.AdminController.Trans_historyfun)




module.exports = router;