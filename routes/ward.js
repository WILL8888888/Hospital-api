const router = require('koa-router')()
const wardCtrl = require('../controller/ward')
router.prefix('/ward')

router.get('/wardInfo',wardCtrl.wardInfo)
router.post('/wardUpdatePrice',wardCtrl.wardUpdatePrice)
router.post('/wardFindType',wardCtrl.wardFindType)
router.post('/wardFindRoom',wardCtrl.wardFindRoom)
router.post('/wardFindBed',wardCtrl.wardFindBed)
router.post('/wardInPatient',wardCtrl.wardInPatient)
module.exports = router