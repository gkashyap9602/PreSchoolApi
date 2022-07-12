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
router.get('/users/:id',Controller.AdminController.SingleUserDetail)

router.get('/classes',Controller.AdminController.get_classes)
router.get('/classes/:id',Controller.AdminController.AllStudentOfOneClass)

router.post('/transaction/create',Controller.AdminController.Trans_historyfun)
router.get('/transaction/history',Controller.AdminController.Pagination_transaction)
router.get('/transaction/history/:id',Controller.AdminController.Filter_transac_by_class)
router.get('/transaction/filter/pastdays',Controller.AdminController.transaction_of_last_days)
router.get('/transaction/filter/bydate',Controller.AdminController.filter_Bydatefun)
router.get('/transaction/filter/totalfee',Controller.AdminController.Totalfee_of_last_days)

module.exports = router;
