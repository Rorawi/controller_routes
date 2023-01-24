const express = require("express")
const { body } = require("express-validator")
const accountModel = require("../models/account")
const { createAccountController, listAccountController } = require('../controllers/accounts')
const router = express.Router()

router.post('/account', [
    body('name').trim().not().isEmpty().withMessage("Fill the name section"),
    body('number').trim().not().isEmpty().withMessage("Fill the number section"),
    body('accountType').trim().not().isEmpty().withMessage("Fill the accountType section"),
    body('bankId').trim().not().isEmpty().withMessage("Fill the bank id section")
   .custom((value, { req }) => {
            return accountModel.findOne({ "bankId": value }).then((accountDoc => {
                if (accountDoc) {
                    return Promise.reject("BankId is already taken")
                }
            }))
        })
], createAccountController)
router.get('/account', listAccountController)

module.exports = router