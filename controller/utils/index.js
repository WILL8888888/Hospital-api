const add =async (model,params,ctx,msg = {success: '添加完成', fail: '添加失败', error: '添加错误'}) => {
  await model.create(params).then(res => {
    if(res){
      ctx.body = {
          code: 200,
          msg: msg.success,
          data: res
      }
    }else{
      ctx.body = {
          code: 300,
          msg: msg.fail
      }
    }
  }).catch(err => {
    ctx.body = {
        code: 400,
        msg: msg.error
    }
    console.error(err)
  })
}


const find =async (model,where,ctx)=>{
  await model.find(where).then(res => {
    ctx.body = {
      result: res
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询时出现异常'
    }
    console.error(err)
  })
}

const findOne =async (model,where,ctx) => {
  await model.findOne(where).then(res => {
    ctx.body = {
      result: res
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询出现异常'
    }
    console.error(err)
  })
}

const update =async (model,where,params,ctx, msg = {success: '更新完成', fail: '更新失败'}) => {
  await model.updateOne(where,params).then(res => {
    ctx.body = {
      code:200,
      msg: msg.success,
      result: res
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: msg.fail,
    }
    console.error(err)
  })
}

const del =async (model,where,ctx, msg) => {
  await model.findOneAndDelete(where).then(res=>{
    ctx.body = {
      result: res,
      code: 200,
      msg: msg.success
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: msg.fail
    }
    console.error(err)
  })
}

module.exports = {
  add,
  find,
  findOne,
  update,
  del
}