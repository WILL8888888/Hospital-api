const router = require('koa-router')()
const logCtrl = require('../controller/log')
router.prefix('/log')

router.post('/logFind',logCtrl.logFind)

module.exports = router