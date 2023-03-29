const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')

/* GET users listing. */
router.get('/:id', transactionController.getTransaction)

module.exports = router
