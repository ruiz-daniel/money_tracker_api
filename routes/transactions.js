const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')

/* GET users listing. */
router.get('/:id', transactionController.getTransaction)
router.patch('/', transactionController.update)
router.delete('/:id', transactionController.delete)

module.exports = router
