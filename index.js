const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { listBankController, createBankController, updateBankController, deleteBankController, createAccountController } = require('./controllers')
const server = express();
//middlewares
server.use(bodyParser.json())

//routes
server.get('/banks/:id?',listBankController)
server.post('/bank', createBankController)
server.put('/bank',updateBankController)
server.delete('/bank',deleteBankController)


server.post('/account', createAccountController)
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Person1:person1@cluster0.2hdoecz.mongodb.net/?retryWrites=true&w=majority",
    // { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(res => {
        server.listen(3000, () => console.log('Server is ready'))
    }).catch(err => console.log(err))

//Running the server
