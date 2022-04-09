const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect = require('./db')
const koajwt = require('koa-jwt')
const cors = require('koa2-cors')

//连接数据库
MongoConnect()

const index = require('./routes/index')
const users = require('./routes/users')
const patient = require('./routes/patient')
const defend = require('./routes/defend')
const medicine = require('./routes/medicine')
const medicineList = require('./routes/medicineList')
const biometric = require('./routes/biometric')
const ward = require('./routes/ward')
const status = require('./routes/updateStatus')
const wardlist = require('./routes/wardlists')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(koajwt({
  secret: 'hospital-server-jwt'
}).unless({
  path:[/^\/users\/login/,/^\/users\/register/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(patient.routes(), patient.allowedMethods())
app.use(defend.routes(), defend.allowedMethods())
app.use(medicine.routes(), medicine.allowedMethods())
app.use(medicineList.routes(), medicineList.allowedMethods())
app.use(biometric.routes(), biometric.allowedMethods())
app.use(ward.routes(),ward.allowedMethods())
app.use(status.routes(),status.allowedMethods())
app.use(wardlist.routes(),wardlist.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
