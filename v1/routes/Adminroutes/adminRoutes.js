const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/index')
// const UploadFile = require('../../../Services/index')
const { FileUpload } = require('../../../Services/index')

router.get('/helloadmin',Controller.AdminController.helloadmin)

router.post('/user/create',FileUpload.multerAdmin.single('student_img'),Controller.AdminController.Newstd_Userfun)
router.patch('/user/update/:id',Controller.AdminController.Update_userfun)
router.delete('/user/delete/:id',Controller.AdminController.Delete_Userfun)

router.post('/class/create',FileUpload.multerAdmin.single('img'),Controller.AdminController.Add_Classfun)
router.patch('/class/update/:id',Controller.AdminController.Update_classfun)
router.delete('/class/delete/:id',Controller.AdminController.Delete_classfun)

router.post('/student/create',FileUpload.multerAdmin.single('img'),Controller.AdminController.Student_addfun)

router.get('/users',Controller.AdminController.User_detailsfun)
router.get('/oneuser',Controller.AdminController.SingleUserDetail)

router.get('/classes',Controller.AdminController.get_classes)
router.get('/oneclassdata',Controller.AdminController.AllStudentOfOneClass)

router.post('/transaction/create',Controller.AdminController.Trans_historyfun)




module.exports = router;