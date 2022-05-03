const { Medicine, Log} = require('../models')
const crud = require('./utils/index')
const { timeShow } = require('../utils/index')

const medicineAdd = async (ctx) => {
  let {medicineid= '', medicineName= '', price= 0, inventory= 0} = ctx.request.body
  let inventoryTotal = inventory
  let Double = false

  if(!medicineid){
    await Medicine.findOne({medicineName}).then(res => {
      if(res) {
        Double = true;
        inventoryTotal += res.inventory
      }
    })
  }else{
    await Medicine.findOne({medicineid}).then(res => {
      if(res) {
        Double = true;
        inventoryTotal += res.inventory
      }
    })
  }
  
  let msg = {
    success: '添加成功',
    fail: '添加失败',
    error: '添加出现异常'
  }

  if(Double){
    await crud.update(Medicine, {$or:[{'medicineid' : medicineid},{'medicineName': medicineName}]},{"$set": {'inventory' : inventoryTotal}}, ctx, msg)
  }else{
    await crud.add(Medicine,{medicineid, medicineName, price, 'inventory': inventoryTotal},ctx, msg)
  }

  if(inventory !== -1){
    const log = `${medicineName}已经添加入库, 入库数量：${inventoryTotal}`;
    await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
  }
}

const medicineSearchAll = async (ctx) => {
  await crud.find(Medicine,null,ctx)
}

const medicineSearchOne = async (ctx) => {
  let { medicineName, medicineid } = ctx.request.body 
  await crud.find(Medicine,medicineid?{'medicineid': medicineid}:{'medicineName' : {$regex:medicineName}},ctx)
}

module.exports = {
  medicineAdd,
  medicineSearchAll,
  medicineSearchOne
}