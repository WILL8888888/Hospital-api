const { Patient, MedicineList, Biometric} = require('../models')
const crud = require('./utils/index')

const updateAllStatus = async (ctx) => {
  let { idnum='', totalPrice = '', outWardPrice = '',outMedicineTotalPrice = '', outDate = ''} = ctx.request.body
  await crud.update(Patient,{'idnum': idnum},{"$set": {'patientStatus' : 'outHospital','totalPrice':totalPrice, 'outMedicineTotalPrice': outMedicineTotalPrice, 'outWardPrice': outWardPrice, 'outDate': outDate}},ctx)
  await MedicineList.updateMany({$and:[{'idnum' : idnum},{'dispatchStatus': 'finished'}]},{"$set": {'medicineListStatus' : 'outHospital'}}).then(res => {
    ctx.body = {
      code:200,
      msg: '更新成功',
      result: res
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '更新失败',
    }
    console.error(err)
  })
  await crud.update(Biometric,{'idnum': idnum},{"$set": {'biometricStatus' : 'outHospital'}},ctx)
}


module.exports = {
  updateAllStatus
}