const router = require('koa-router')()
const medicineListCtrl = require('../controller/medicineList')
router.prefix('/medicineList')

router.post('/medicineInfo',medicineListCtrl.medicineInfo)
router.get('/medicineListSearchAll',medicineListCtrl.medicineListSearchAll)
router.post('/medicineListSearchOne',medicineListCtrl.medicineListSearchOne)
router.post('/medicineListOutSearch',medicineListCtrl.medicineListOutSearch)
router.post('/dispatchFinish',medicineListCtrl.dispatchFinish)
router.post('/cancelList',medicineListCtrl.cancelList)
module.exports = router
