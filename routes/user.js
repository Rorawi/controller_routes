const express = require("express");
const {body} = require('express-validator')
const {signUpController, signInController} = require("../controllers/user")
const userModel = require("../models/user")
const router =  express.Router()

router.put('/signup',[
    body('name').trim().not().isEmpty().withMessage("User name is required"),
    body('email')
    .not()
    .isEmpty()
    .withMessage("Email is invalid")
    .custom((value,{req})=> {
        return userModel.findOne({"email" :value}).then((userDoc=> {
            if(userDoc) {
                return Promise.reject("Email is already taken")
            }
        }))
    }),
    body('password').trim().isLength({min: 5})
],signUpController)

router.post("/signin",[
    body('email')
    .not()
    .isEmpty()
    .withMessage("Email is invalid"),
    body('password').trim().isLength({min: 5})
],signInController)

module.exports = router