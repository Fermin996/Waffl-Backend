const mongoose = require('mongoose')
const Schema = mongoose.Schema

const payPeriodSchema = new Schema({
    user:{type:mongoose.Types.ObjectId, ref:"User"},
    periodStartDate:{type:Date},
    hours:{type:Number, required:true},
    totalTips:{type:Number, required: true},
    shifts:[{type:mongoose.Types.ObjectId, ref:"Shift"}],
})

module.exports = mongoose.model('PayPeriod', payPeriodSchema)