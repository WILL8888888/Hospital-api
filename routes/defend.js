const router = require('koa-router')()
const defendCtrl = require('../controller/defend')
router.prefix('/defend')

router.post('/defendAdd',defendCtrl.defendAdd)
router.get('/defendSearchAll',defendCtrl.defendSearchAll)
router.post('/defendSearchOne',defendCtrl.defendSearchOne)
module.exports = router