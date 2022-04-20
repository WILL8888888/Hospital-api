const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  workid: String,
  name: String,
  password: String,
  role: String,
  level: String,
  department: String,
  defendStatus: String,
  defendItem: String,
  medicineInfo: Object,
  manage: String
})

const patientSchema = new mongoose.Schema({
  name: String,
  idnum: String,
  gender: String,
  address: String,
  departmentDoctor: String,
  wardType: String,
  wardRoom: String,
  wardBed: String,
  condition: String,
  date: String,
  medicineInfo: Object,
  timeStamps: String,
  patientStatus: String,
  outDate: String,
  outWardPrice : String,
  outMedicineTotalPrice : String,
  totalPrice: String
})

const defendSchema = new mongoose.Schema({
  defendid: String,
  defendName: String,
  inventory: Number
})

const medicineSchema = new mongoose.Schema({
  medicineid: String,
  medicineName: String,
  price: Number,
  inventory: Number
})

const medicineListSchema = new mongoose.Schema({
  medicineid: String,
  medicineName: String,
  price: Number,
  medicineNum: Number,
  idnum: String,
  nurseWorkid: String,
  doctorWorkid: String,
  dispatchStatus: String,
  medicineListStatus: String
})

const biometricSchema = new mongoose.Schema({
  name: String,
  idnum: String,
  temperature: Array,
  heartrate: Array,
  bloodsugar: Array,
  covid: Array,
  checktime: Array,
  biometricStatus: String
})

const wardSchema = new mongoose.Schema({
  wardType: String,
  wardRoom: String,
  wardBed: String,
  patientId: String,
  doctorid: String,
  nurseid: String
})

const wardListSchema = new mongoose.Schema({
  wardType: String,
  wardRoom: Array,
  wardBed: Array,
  price: Number
})

const User = mongoose.model('users',userSchema)
const Patient = mongoose.model('patients', patientSchema)
const Defend = mongoose.model('defends', defendSchema)
const Medicine = mongoose.model('medicines', medicineSchema)
const MedicineList = mongoose.model('medicinelists', medicineListSchema)
const Biometric = mongoose.model('biometric', biometricSchema)
const Ward = mongoose.model('ward',wardSchema)
const WardList = mongoose.model('wardlists', wardListSchema)
module.exports = {
  User,
  Patient,
  Defend,
  Medicine,
  MedicineList,
  Biometric,
  Ward,
  WardList
}