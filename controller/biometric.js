const { Biometric, Log} = require('../models')
const crud = require('./utils/index')
let outStatus = {'biometricStatus': 'outHospital'}
const { timeShow } = require('../utils/index')

const biometricAdd = async (ctx)=>{
  let {name = '', idnum = '', temperature = '', heartrate = '', bloodsugar = '', covid = '', checktime = '',biometricStatus=''} = ctx.request.body
  let msg = {
    success: '录入成功',
    fail: '录入失败'
  }
  let isDouble = false
  await Biometric.findOne({idnum}).then(res=>{
    if(res){
      isDouble = true;
    } 
  })
    
  if(isDouble){
    await crud.update(Biometric, {'idnum': idnum}, {$push : {temperature : temperature,heartrate: heartrate,bloodsugar: bloodsugar,covid: covid,checktime:checktime}}, ctx, msg)
  }else{
    temperature = [temperature];
    heartrate = [heartrate];
    bloodsugar = [bloodsugar];
    covid = [covid];
    checktime = [checktime];
    await crud.add(Biometric, {name , idnum, temperature, heartrate, bloodsugar, covid , checktime,biometricStatus}, ctx, msg)
  }
  const log = `病人${name}的体征数据录入`

  await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
}

const biometricSearch = async (ctx)=>{
  let {idnum = '', name = ''} = ctx.request.body;
  let status = {'patientStatus': 'inHospital'}
  await crud.find(Biometric,idnum?{$and:[{'idnum' : idnum},status]}:{$and:[{'name' : {$regex:name}},status]},ctx)
}

const biometricOutSearch = async (ctx)=>{
  let {idnum = ''} = ctx.request.body;
  await crud.find(Biometric,{$and:[{'idnum' : idnum},outStatus]},ctx)
}

module.exports = {
  biometricAdd,
  biometricSearch,
  biometricOutSearch
}