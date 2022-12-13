const express = require("express")
const bodyParser = require("body-parser")
const BankModel = require('./model');
const {listBankController, createBankController, updateBankController, deleteBankController} = require('./controllers')
const server = express();
//middlewares
server.use(bodyParser.json())

//routes
server.get('/bank',listBankController)
server.post('/bank',createBankController)
server.put('/bank',updateBankController)
server.delete('/bank',deleteBankController)


//Running the server
 server.listen(3000,()=> console.log('Server is ready'))