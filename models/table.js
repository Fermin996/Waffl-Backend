const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    user:{type:mongoose.Types.ObjectId, ref:"User"},
    shift:{type:mongoose.Types.ObjectId, ref:"Shift"},
    checks:[{type:mongoose.Types.ObjectId, ref:"Check"}],
    number: {type:Number},
    isOpen:{type:Boolean},
    status:{type:String},
    openedTime:{type:Date},
    closedTime:{type:Date},
    checkTime:{type: Number},
    tableTotal:{type: Number},
    tableTip:{type:Number}
})

module.exports = mongoose.model('Table', tableSchema)