const { WardList } = require('../models')
const crud = require('./utils/index')

const wardListAll =async (ctx)=>{
  await crud.find(WardList,null,ctx)
}

const wardGetPrice = async (ctx)=>{
  let {wardType}=ctx.request.body
  await crud.find(WardList,{'wardType':wardType},ctx)
}

module.exports = {
  wardListAll,
  wardGetPrice
}