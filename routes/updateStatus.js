const router = require('koa-router')()
const updateCtrl = require('../controller/updateStatus')
router.prefix('/status')

router.post('/updateAllStatus',updateCtrl.updateAllStatus)

module.exports = router