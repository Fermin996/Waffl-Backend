const express = require('express')
const checkControllers = require('../controllers/check-controller')

const router = express.Router()

router.get('/:cId', checkControllers.getCheck)
router.get('/table/:tableId', checkControllers.getCheckByTable)
router.post('/create', checkControllers.createCheck)
router.patch('/update/:cId', checkControllers.updateCheck)
router.delete('/:cId', checkControllers.deleteCheck)

module.exports=router;