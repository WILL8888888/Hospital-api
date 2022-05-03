const { WardList, Log} = require('../models')
const crud = require('./utils/index')
const { timeShow } = require('../utils/index')
const wardListAll =async (ctx)=>{
  await crud.find(WardList,null,ctx)
}

const wardGetPrice = async (ctx)=>{
  let {wardType}=ctx.request.body
  await crud.find(WardList,{'wardType':wardType},ctx)
}

const wardPriceAdjust = async (ctx)=>{
  let {wardType = '', price = 0} = ctx.request.body
  await crud.update(WardList,{'wardType': wardType},{'price': price},ctx)
  const log = `${wardType}房型将价格调整为${price}元`
  await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
}

const wardListUpdate = async (ctx)=>{
  let {wardType = '', roomName = ''} = ctx.request.body;
  await crud.update(WardList,{'wardType':wardType},{$push: {'wardRoom': roomName}},ctx)
}

module.exports = {
  wardListAll,
  wardGetPrice,
  wardPriceAdjust,
  wardListUpdate
}