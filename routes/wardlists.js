const router = require('koa-router')()
const wardlistCtrl = require('../controller/wardlists')
router.prefix('/wardlist')

router.post('/wardListAll',wardlistCtrl.wardListAll)
router.post('/wardGetPrice',wardlistCtrl.wardGetPrice)
module.exports = router