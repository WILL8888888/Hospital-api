const { Ward, Patient, WardList} = require('../models')
const crud = require('./utils/index')

const wardInfo =async (ctx)=>{
  await crud.find(Ward,null,ctx)
}

const wardFindType = async (ctx)=>{
  await Ward.find(null).then(res=>{
    let wardTypeArr = res.map(item => {return item.wardType})
    wardTypeArr = [...new Set(wardTypeArr)];
    ctx.body = {
      result: wardTypeArr,
      code: 200
    }
  }).catch(err =>{
    ctx.body = {
      code: 400,
    }
    console.error(err)
  })

}

const wardFindRoom = async (ctx)=>{
  let { wardType } = ctx.request.body;
  await Ward.find({'wardType':wardType}).then(res => {
    let wardRoomArr = res.map(item => {
      if(!item.patientId)
        return item.wardRoom
    }).filter(Boolean)
    wardRoomArr = [...new Set(wardRoomArr)]
    ctx.body = {
      result: wardRoomArr,
      code: 200
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
    }
    console.error(err)
  })
}

const wardFindBed =async (ctx)=>{
  let { wardType, wardRoom} = ctx.request.body;
  await Ward.find({$and:[{'wardType': wardType},{'wardRoom':wardRoom}]}).then(res=>{
    let wardBedArr = res.map(item => {
      if(!item.patientId)
        return item.wardBed
    }).filter(Boolean)

    ctx.body = {
      result: wardBedArr,
      code: 200
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
    }
    console.error(err)
  })
}

const wardInPatient =async (ctx)=>{
  let { wardType, wardRoom, wardBed, patientId} = ctx.request.body;
  await Ward.updateOne({$and:[{'wardType': wardType},{'wardRoom':wardRoom},{'wardBed': wardBed}]},{'patientId':patientId}).then(res=>{

    ctx.body = {
      code: 200,
      msg: '添加成功',
      data: res
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
    }
    console.error(err)
  })
}

const wardUpdatePrice = async (ctx)=>{
  let {roomName, price} = ctx.request.body;
  let msg = {
    success: '修改价格成功',
    fail: '修改价格失败'
  }
  await crud.update(Ward,{wardType: roomName},{"$set": {'price' : price}},ctx,msg)
}

const wardFindPatientInfo = async (ctx)=>{
  let {patientId} = ctx.request.body;
  await crud.find(Ward, {'patientId':patientId},ctx)
}

const getWardPatientInfo = async (ctx) =>{
  let { wardType = '', wardRoom='', wardBed='' } = ctx.request.body;
  console.log(wardType,wardRoom,wardBed)
  await crud.find(Patient,{$and:[{'wardType':wardType},{'wardRoom':wardRoom},{'wardBed':wardBed}]},ctx)
}

const wardSpareBed = async (ctx)=>{
  let {wardType = ''} = ctx.request.body;
  await Ward.find({'wardType': wardType}).then(res=>{
    let wardBedArr = res.map(item => {
      if(!item.patientId)
        return {
          'wardBed' : item.wardBed,
          'wardRoom' : item.wardRoom}
    }).filter(Boolean)

    ctx.body = {
      result: wardBedArr,
      code: 200
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
    }
    console.error(err)
  })
}

const wardAddRoom =async (ctx)=>{
  let {wardType = '', roomName = '',bedNum = 0, newRoomNurseId = '', newRoomDoctorId = ''} = ctx.request.body;
  let bedNumArray = [1,2,3,4]
  bedNumArray.length = bedNum
  let addArr = [];
  bedNumArray.forEach(async item =>{
    let wardBed = `00${(item)}床`
    addArr.push({'wardType':wardType,'wardRoom':roomName,'wardBed':wardBed,'patientId': '','doctorid': newRoomDoctorId,'nurseid': newRoomNurseId})
  })
  await crud.add(Ward,addArr,ctx)
}

module.exports = {
  wardInfo,
  wardUpdatePrice,
  wardFindType,
  wardFindRoom,
  wardFindBed,
  wardInPatient,
  wardFindPatientInfo,
  getWardPatientInfo,
  wardSpareBed,
  wardAddRoom
}