const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/login', userController.login)
router.post('/', userController.register)
router.post('/:id/account', userController.addAccount)
router.patch('/', userController.update)
router.delete('/:id', userController.delete)

module.exports = router
