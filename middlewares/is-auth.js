const jwt = require('jsonwebtoken')

const isAuth=(req,res,next)=> {
    try {
        const authorizatiobnHeader = req.get('Authorization')
    if(!authorizatiobnHeader) {
        throw new Error('Unauthenticated')

        const token = authorizatiobnHeader.split('')[1];
        const decodedToken = jwt.verify(token,'supersecretkeythatcannotbeeasilyguessed')

        if(!decodedToken) 
            throw new Error('Unauthorized')
        next();
    }
    } catch (error) {
        console.log(error);
        res.json({message: error.message})
    }
}
module.exports = isAuth;