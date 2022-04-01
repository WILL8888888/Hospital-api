const router = require('koa-router')()
const patientCtrl = require('../controller/patient')
router.prefix('/patient')

//病人信息录入
router.post('/info',patientCtrl.patientInfo)

//获取全部病人信息
router.get('/allList',patientCtrl.patientAll)

//获取查询病人信息
router.post('/personalPatientInfo',patientCtrl.personalPatientInfo)

router.get('/allOutList',patientCtrl.patientOutAll)

router.post('/personaloutPatientInfo',patientCtrl.personaloutPatientInfo)

module.exports = router