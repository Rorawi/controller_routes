const UserModel = require("../models/user")
const bcrypt = require("bcryptjs")
const { validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")
const signUpController = (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.json({ message: error.array()[0].msg })
    }

    const { name, email, password } = req.body
    bcrypt.hash(password, 7).then(hashedPassword => {
        const user = new UserModel({ name, email, password: hashedPassword });

        user.save().then(user => {
            res.json({ "message": 'sign up successful', data: { name: user.name, email: user.email, } })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}


const signInController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //console.log(errors);
            return res.json({ message: errors.array()[0].msg })
        }
            //Find the email
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({ message: "user not found" });

        }
        //compare correct passwords to log user in
        const isAuth = await bcrypt.compare(password, user.password)
        if (!isAuth) {
            return res.json({ message: "User and email combination is incorrect" })

        }

      const token =   jwt.sign(
        {name: user.name,email:user.email,userId:user._id},
        'supersecretkeythatcannotbeeasilyguessed',
        {expiresIn:'1h'});

        return res.json({message: "Congrats! you are signed in",token})

    } 
    catch (error) {

    }
}


module.exports = {
    signUpController,
    signInController
}

























//     UserModel.findOne({email:email}).then(user => {
//         if(user) {
//             //compare password
//           .then(result => {
//                 if(result) {
//                 }
//                 else {
//                 }
//             }).catch(err => {
//                 console.log(err);
//                 return res.json({message:"Failed to sign in. PLease try again"})
//             })
//             return;
//         }


//     }).catch(err=>{ 
//         console.log(err);
//         res.json({message:"Server error, Please try again"})
//     });
// }