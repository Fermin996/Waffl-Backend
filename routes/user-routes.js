const express = require('express')
const userControllers = require('../controllers/user-controller')

const router = express.Router()

router.post('/create', userControllers.createUser)
router.post('/clockIn', userControllers.clockInUser)

module.exports=router;