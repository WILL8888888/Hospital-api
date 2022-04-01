const router = require('koa-router')()
const biometricCtrl = require('../controller/biometric')
router.prefix('/biometric')

router.post('/biometricAdd',biometricCtrl.biometricAdd)
router.post('/biometricSearch',biometricCtrl.biometricSearch)
router.post('/biometricOutSearch',biometricCtrl.biometricOutSearch)
module.exports = router