const { Patient, Ward, Log} = require('../models')
const crud = require('./utils/index')
const { timeShow } = require('../utils/index')
let status = {'patientStatus': 'inHospital'}
let outStatus = {'patientStatus': 'outHospital'}
//病人信息录入
const patientInfo = async (ctx) => {
  let {name= '', idnum= '', gender= '',address='',departmentDoctor='',wardType='',wardRoom='',wardBed='',condition='',date='', timeStamps='', patientStatus= ""} = ctx.request.body

  let isDouble = false

  await Patient.findOne({idnum}).then(res=>{
    if(res) isDouble = true
  })
  if(isDouble){
    ctx.body = {
        code:300,
        msg: '该病人已登记入院'
    }
    return
  }
  let msg = {
    success: '登记成功',
    fail: '登记失败',
    error: '登记出现异常'
  }

  const log = `病人${name}入住${wardType} ${wardRoom} ${wardBed},科室/主治医师：${departmentDoctor},病人病情：${condition}`
  await crud.add(Patient,{name, idnum, gender, address, departmentDoctor, wardType, wardRoom, wardBed, condition, date, timeStamps, patientStatus},ctx,msg)
  await crud.add(Log, {time: timeShow(new Date()), log: log},ctx)
}

//全部入院病人信息列表

const patientAll = async (ctx) => {
  await crud.find(Patient,status,ctx)
}

//全部出院病人信息列表

const patientOutAll = async (ctx) => {
  await crud.find(Patient,outStatus,ctx)
}

//获取查询到的入院病人信息

const personalPatientInfo = async (ctx) => {
  let {name, idnum} = ctx.request.body
  
  await crud.find(Patient,idnum?{$and:[{'idnum' : idnum},status]}:{$and:[{'name' : {$regex:name}},status]},ctx)
}

//获取查询到的出院病人信息

const personaloutPatientInfo = async (ctx) => {
  let { idnum } = ctx.request.body
  
  await crud.find(Patient,{$and:[{'idnum' : idnum},outStatus]},ctx)
}

module.exports = {
  patientInfo,
  patientAll,
  patientOutAll,
  personalPatientInfo,
  personaloutPatientInfo
}