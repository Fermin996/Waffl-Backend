const Table = require('../models/table')

const createTable = async(req,res,next)=>{

    const {user, table, openedTime, shiftId} = req.body
    let openedDate =  new Date(openedTime)
    let createdTable = new Table({
        user,
        number:table,
        isOpen:true,
        openedDate,
        checks:[],
        shift:shiftId
    })

    try {
        await createdTable.save()
    } catch (error) {
        console.log(error)
    }

    res.json(createdTable)

}


const getOpenTables=async(req, res, next)=>{
    
    let tables
    try{
        tables = await Table.find({isOpen: true}).populate()
        console.log(tables)
    }catch(err){
        console.log(err)
    }

    res.json(tables)

}

const getTable = async(req,res,next)=>{
    const tableId = req.params.tId

    let table

    try{    
        table = await Table.findById(tableId)
    }catch(err){
        console.log(err)
    }

    res.json(table)

}

const deleteTable = async(req, res, next)=>{
    const tableId = req.params.tId
    let table

    try{
        table = await Table.findById(tableId)
    }catch(err){
        console.log(err)
    }

    try{
        await table.remove()
    }catch(err){
        console.log(err)
    }

}

exports.createTable = createTable
exports.getTable = getTable
exports.getOpenTables = getOpenTables
exports.deleteTable = deleteTable