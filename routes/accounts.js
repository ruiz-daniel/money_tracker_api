const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account')

/* GET users listing. */
router.get('/:id', accountController.getAccount)
router.patch('/', accountController.update)
router.delete('/:id', accountController.delete)

module.exports = router
