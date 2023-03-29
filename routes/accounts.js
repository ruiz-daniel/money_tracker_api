const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account')

/* GET users listing. */
router.get('/:id', accountController.getAccount)
router.post('/:id/transaction', accountController.addTransaction)
router.patch('/', accountController.update)
router.delete('/:id', accountController.delete)
router.patch('/:id/transaction', accountController.changeTransaction)
router.delete('/:id/transaction/:transactionID', accountController.deleteTransaction)

module.exports = router
