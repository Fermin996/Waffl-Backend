const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shiftSchema = new Schema({
    user:{type:mongoose.Types.ObjectId, ref:"User"},
    checks:[{type:mongoose.Types.ObjectId, ref:"Check"}],
    inTime:{type:Date},
    outTime:{type:Date},
    hours:{type:Number},
    tips:{type:Number}
})

module.exports = mongoose.model('Shift', shiftSchema)