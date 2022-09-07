const express = require('express')
const tableControllers = require('../controllers/table-controller')

const router = express.Router()

router.get('/current-table/:tId', tableControllers.getTable)
router.get('/open', tableControllers.getOpenTables )
router.patch('/update-checks/:tId', tableControllers.updateChecks)
router.post('/create', tableControllers.createTable)
router.delete('/:tId', tableControllers.deleteTable)

module.exports=router;