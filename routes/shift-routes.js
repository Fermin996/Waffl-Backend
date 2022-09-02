const express = require('express')
const shiftControllers = require('../controllers/shift-controller')

const router = express.Router()

router.post('/start', shiftControllers.createShift)

module.exports=router;