const Check = require('../models/check')
const Shift = require('../models/shift')
const Table = require('../models/table')

const createCheck = async(req, res, next)=>{
    const {user, openedTime, shiftId, tableId, number} = req.body

    // openedTime & closedTime
    let openedDate = new Date(openedTime)
    // let closedDate = new Date(closedTime)

    // let checkTime = closedDate.getTime() - openedDate.getTime()

    // checkTime = checkTime*1000*60
    console.log("CRWATEFCHECK IS RUNNING")
    console.log(tableId)

    let createdCheck = new Check({
        user,
        openedTime:openedDate,
        shiftId,
        number,
        table:tableId
    })

    try {
        await createdCheck.save()
    } catch (error) {
        console.log(error)
    }

    try {
        let shift = await Shift.findById(shiftId)
        shift.checks.push(createdCheck._id)
        await shift.save()
    } catch (error) {
        console.log(error)
    }

    
    let table
    try{
        table = await Table.findById(tableId)
    }catch(err){
        console.log(err)
    }
    table.checks.push(createdCheck._id)
    try{
        await table.save()
    }catch(err){
        console.log(err)
    }


    res.json(createdCheck)

}

const getCheck=async(req,res, next)=>{
    const checkId = req.params.cId
    // console.log("GETCCHECK RUNNING IN BACKEND")
    let check
    try{
        check = await Check.findById(checkId)
    }catch(err){
        console.log(err)
    }

    console.log("GET CHECK CHECK")
    console.log(check)

    res.json(check)

}

const updateCheck = async(req, res, next)=>{

    const newCheckItems = req.body.checkItems
    const checkId = req.params.cId

    console.log("CHECK ITEMS INPUT IN UPDATE CHECK")
    console.log(newCheckItems)
    let check

    try{
        check = await Check.findById(checkId)
    }catch(err){
        console.log(err)
    }

    console.log("CHECK FOUND IN UPDATE CHECK vvvvvvvvvv")
    console.log(check)

    check.checkItems = newCheckItems

    try{
        await check.save()
    }catch(err){
        console.log(err)
    }

}

const deleteCheck = async(req, res, next)=>{
    const checkId = req.params.cId
    // const tableId = req.body.tableId

    let check
    // let table

    try{
        check = await Check.findById(checkId)
    }catch(err){
        console.log(err)
    }

    try{
        table = await Table.findById(check.table)
    }catch(err){
        console.log(err)
    }

    try{
        table.checks.splice(table.checks.indexOf(checkId), 1)
        await table.save()
    }catch(err){
        console.log(err)
    }

    try{
        await check.remove()
    }catch(err){
        console.log(err)
    }

    res.status(200).json({ message:"check deleted" })

}

exports.createCheck = createCheck 
exports.getCheck = getCheck
exports.updateCheck = updateCheck
exports.deleteCheck = deleteCheck