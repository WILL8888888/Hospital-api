const router = require('koa-router')()
const userCtrl = require('../controller/user')
router.prefix('/users')

//用户注册
router.post('/register',userCtrl.userRegister)

//用户登录
router.post('/login',userCtrl.userLogin)

//验证用户登录
router.post('/verify',userCtrl.verify)

//获取全部医生信息
router.get('/doctorAllInfo',userCtrl.doctorAllInfo)
router.post('/doctorPersonalInfo',userCtrl.doctorPersonalInfo)

//获取全部护士信息
router.get('/nurseAllInfo',userCtrl.nurseAllInfo)
router.post('/nursePersonalInfo',userCtrl.nursePersonalInfo)

//修改用户防护字段
router.post('/defendStatusAsking',userCtrl.defendStatusAsking)
router.post('/defendStatusWaitAsk',userCtrl.defendStatusWaitAsk)

//获取全部用户信息
router.get('/askingUser',userCtrl.askingUser)
router.get('/allUserInfo',userCtrl.allUserInfo)

//获取个人信息
router.post('/personalInfo',userCtrl.personalInfo)

router.post('/passwordCheck',userCtrl.passwordCheck)
router.post('/updateTitleName',userCtrl.updateTitleName)
router.post('/updateIdentify',userCtrl.updateIdentify)
router.post('/deleteUser',userCtrl.deleteUser)
module.exports = router
