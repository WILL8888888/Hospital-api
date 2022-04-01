const {User} = require('../models')
const crud = require('./utils/index')
let jwt = require('jsonwebtoken')
const Crypt = require("../utils/crypt");

//注册用户
const userRegister = async (ctx) => {
  let {workid= '', name= '',password= '', role= '', level= '', department= '', defendStatus=''} = ctx.request.body
  password = Crypt.encrypt(password);
  let isDouble = false

  await User.findOne({workid}).then(res=>{
    if(res) isDouble = true
  })
  if(isDouble){
    ctx.body = {
        code:300,
        msg: '此工号已被注册'
    }
    return
  }
  let msg = {
    success: '注册成功',
    fail: '注册失败',
    error: '注册出现异常'
  }
  await crud.add(User,{workid, name, password, role, level, department, defendStatus},ctx,msg)
}

//用户登录
const userLogin = async (ctx) => {
  let {workid,password} = ctx.request.body;

  await User.findOne({workid}).then(res => {
    let workName = res.name
    const checkPassword = Crypt.decrypt(password, res.password);
    if(checkPassword){
      let token = jwt.sign({
        workid: res.workid,
        _id: res._id
      },'hospital-server-jwt',{
        expiresIn: 3600 * 24 * 7
      })

      ctx.body = {
        code: 200,
        msg: '登录成功',
        token,
        workName,
        workid
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '登录失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '登录时出错'
    }
    console.error(err)
  })
}

//验证用户登录

const verify = async ctx=>{
  let token = ctx.header.authorization
  token = token.replace('Bearer ','')

  try{
    let result = jwt.verify(token, 'hospital-server-jwt')
    await User.findOne({_id: result._id}).then(res => {
      if(res){
        ctx.body = {
          code: 200,
          msg: '用户验证成功',
          user: res
        }
        }else{
          ctx.body = {
            code: 500,
            msg: '用户验证失败'
          }
      }
    })
  }catch(err){
    ctx.body = {
      code: 400,
      msg: '用户验证失败'
    }
  }
}

//医生全部信息
const doctorAllInfo = async (ctx)=> {
  await crud.find(User,{'role':'医生'},ctx)
}

//查询单个医生信息
const doctorPersonalInfo = async (ctx)=> {
  let { name, workid } = ctx.request.body 
  await crud.find(User,{$or:[{'name' : name},{'workid': workid}]},ctx)
}

//护士全部信息
const nurseAllInfo = async (ctx)=> {
  await crud.find(User,{'role':'护士'},ctx)
}

//查询单个护士信息
const nursePersonalInfo = async (ctx)=> {
  let { name, workid } = ctx.request.body 
  await crud.find(User,{$or:[{'name' : name},{'workid': workid}]},ctx)
}

//根据id查询个人信息
const personalInfo = async (ctx)=> {
  let {workid} = ctx.request.body
  await crud.findOne(User,{'workid': workid},ctx)
}

//更改防护状态为申请中
const defendStatusAsking = async (ctx)=> {
  let { workid, defendList} = ctx.request.body
  let msg = {
    success: '申请成功',
    fail: '申请失败'
  }
  await crud.update(User, {'workid' : workid},{"$set": {'defendItem' : defendList.join(', '), 'defendStatus' : 'asking'}}, ctx, msg)
}

//更改防护状态为申请中
const defendStatusWaitAsk = async (ctx)=> {
  let { workid } = ctx.request.body
  console.log(workid)
  let msg = {
    success: '派发成功',
    fail: '派发失败'
  }
  await crud.update(User, {'workid' : workid},{"$set": {'defendStatus' : 'waitAsk'}}, ctx, msg)
}

const askingUser = async (ctx)=> {
  await crud.find(User, {'defendStatus' : 'asking'}, ctx)
}

//获取全部用户信息
const allUserInfo = async (ctx)=> {
  await crud.find(User,null,ctx)
}
module.exports = {
  userRegister,
  userLogin,
  verify,
  doctorAllInfo,
  doctorPersonalInfo,
  nurseAllInfo,
  nursePersonalInfo,
  defendStatusAsking,
  defendStatusWaitAsk,
  askingUser,
  allUserInfo,
  personalInfo
}