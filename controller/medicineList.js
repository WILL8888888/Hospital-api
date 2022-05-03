const { MedicineList, Log, Patient} = require('../models')
const crud = require('./utils/index')
let status = {'medicineListStatus':'inHospital'}
let outStatus = {'medicineListStatus': 'outHospital'}
const { timeShow } = require('../utils/index')
//药单信息录入
const medicineInfo = async (ctx) => {
  let {medicineid= '', medicineName= '', price= 0, medicineNum= 0, idnum='',nurseWorkid='',doctorWorkid='', medicineListStatus= ''} = ctx.request.body

  let isDouble = false
  let medicineNumTotal = medicineNum
  await MedicineList.findOne({medicineid}).then(res=>{
    if(res){
      isDouble = true;
      medicineNumTotal += res.medicineNum
    } 
  })
  let msg = {
    success: '添加成功',
    fail: '添加失败',
    error: '添加出现异常'
  }
  await Patient.findOne({idnum}).then(async res=>{
    if(res.patientStatus === 'inHospital'){
      if(isDouble){
        await crud.update(MedicineList, {'medicineid': medicineid}, {"$set": {'medicineNum' : medicineNumTotal,'dispatchStatus': 'wait'}}, ctx, msg)
      }else{
        await crud.add(MedicineList,{medicineid, medicineName, price, medicineNum, idnum, nurseWorkid, doctorWorkid, dispatchStatus: 'wait', medicineListStatus},ctx,msg)
      }
    
      const log = `${medicineName}派发给${idnum},剂量数：${medicineNum}`;
      await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
    }else{
      ctx.body = {
        code: 400,
        msg: '病人已经出院！'
      } 
    }
  })

  
}

const medicineListSearchAll =async (ctx)=>{
  await crud.find(MedicineList,null,ctx)
}

const medicineListSearchOne =async (ctx)=>{
  let { idnum='' } = ctx.request.body

  await crud.find(MedicineList,{$and:[{'idnum' : idnum},status,{'dispatchStatus': 'finished'}]},ctx)
}

const medicineListOutSearch =async (ctx)=>{
  let { idnum='' } = ctx.request.body
  await crud.find(MedicineList,{$and:[{'idnum' : idnum},outStatus,{'dispatchStatus': 'finished'}]},ctx)
}

const dispatchFinish = async (ctx)=>{
  let {medicineid = ''} = ctx.request.body
  let msg = {
    success:'派发完成',
    fail:'派发失败'
  }
  await crud.update(MedicineList,{'medicineid':medicineid}, {"$set": {'dispatchStatus': 'finished'}}, ctx, msg)
}

const cancelList = async (ctx)=>{
  let {medicineid = ''} = ctx.request.body
  let msg = {
    success:'成功取消',
    fail:'取消失败'
  }
  await crud.del(MedicineList,{'medicineid':medicineid}, ctx, msg)
}

module.exports = {
  medicineInfo,
  medicineListSearchAll,
  dispatchFinish,
  medicineListSearchOne,
  medicineListOutSearch,
  cancelList
}