const express = require("express")
const {createAccountController,listAccountController} = require('../controllers/accounts')
const router = express.Router()

router.post('/account', createAccountController)
router.get('/account',listAccountController)

module.exports = router