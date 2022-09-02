const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkSchema = new Schema({
    user:{type:mongoose.Types.ObjectId, ref:"User"},
    table:{type:mongoose.Types.ObjectId, ref:"Table"},
    status:{type:String},
    checkTime:{type: Number},
    total:{type: Number},
    checkItems:[{
        title:{type:String},
        price:{type:Number},
        timeSent:{type:Date},
        quantity: {type:Number},
        foodType: {type: String},
        sent:{type: Boolean},
        isDone:{type: String}
    }],
    tip:{type:Number}
})

module.exports = mongoose.model('Check', checkSchema)