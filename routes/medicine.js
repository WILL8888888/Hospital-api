const router = require('koa-router')()
const medicineCtrl = require('../controller/medicine')
router.prefix('/medicine')

router.post('/medicineAdd',medicineCtrl.medicineAdd)
router.get('/medicineSearchAll',medicineCtrl.medicineSearchAll)
router.post('/medicineSearchOne',medicineCtrl.medicineSearchOne)

module.exports = router