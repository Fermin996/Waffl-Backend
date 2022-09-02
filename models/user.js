const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{type: String, required: true},
    pin:{type: Number, required: true},
    // openChecks:[{type:mongoose.Types.ObjectId, ref:"Checks"}],
    // closedChecks:[{type:mongoose.Types.ObjectId, ref:"Checks"}],
    payPeriods:[{type:mongoose.Types.ObjectId, ref:"payPeriod"}],
})

module.exports = mongoose.model('User', userSchema)