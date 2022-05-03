const { Defend, Log} = require('../models')
const crud = require('./utils/index')
const { timeShow } = require('../utils/index')

const defendAdd = async (ctx) => {
  let {defendid = '', defendName = '', inventory = 0} = ctx.request.body
  let inventoryTotal = inventory
  let Double = false

  if(!defendid){
    await Defend.findOne({defendName}).then(res => {
      if(res) {
        Double = true;
        inventoryTotal += res.inventory
      }
    })
  }else{
    await Defend.findOne({defendid}).then(res => {
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
    await crud.update(Defend, {$or:[{'defendid' : defendid},{'defendName': defendName}]},{"$set": {'inventory' : inventoryTotal}}, ctx, msg)
  }else{
    await crud.add(Defend,{defendid, defendName, 'inventory': inventoryTotal},ctx, msg)
  }
  if(inventory !== -1){
    const log = `${defendName}已经添加入库, 入库数量：${inventoryTotal}`;
    await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
  }
}

const defendSearchAll = async (ctx) => {
  await crud.find(Defend,null,ctx)
}

const defendSearchOne = async (ctx) => {
  let { defendName, defendid } = ctx.request.body 
  await crud.find(Defend,defendid?{'defendid': defendid}:{'defendName' : {$regex:defendName}},ctx)
}

module.exports = {
  defendAdd,
  defendSearchAll,
  defendSearchOne
}