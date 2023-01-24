const express = require("express")
const {body} = require("express-validator")
const isAuth = require('../middlewares/is-auth')
const {listBankController, createBankController, updateBankController, deleteBankController} = require("../controllers/banks");
const BankModel = require("../models/bank");
const router = express.Router();

router.get('/banks/:id?',isAuth,listBankController)
router.post('/banks',isAuth ,[
    body('name').trim().not().isEmpty().withMessage("Name cannot be empty"),
    body('location').trim().not().isEmpty().withMessage("Location cannot be empty"),
    body('branch').trim().not().isEmpty().withMessage("Branch cannot be empty"),
    body('phone').isMobilePhone('en-GH')
    .custom((value,{req})=> {
        return BankModel.findOne({'phone':value}).then(bankDoc => {
            if(bankDoc) {
                return Promise.reject("Phone number is already taken")
            }
        })
    })
], createBankController)
router.put('/bank',isAuth,updateBankController)
router.delete('/bank',isAuth,deleteBankController)

module.exports = router