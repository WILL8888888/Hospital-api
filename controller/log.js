const { Log } = require('../models')
const crud = require('./utils/index')

const logFind =async (ctx)=>{
  await crud.find(Log,null,ctx)
}

module.exports = {
  logFind
}