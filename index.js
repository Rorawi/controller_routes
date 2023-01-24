const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const accountRoutes = require('./routes/account')
const bankRoutes = require('./routes/bank')
const userRoutes = require("./routes/user")
// const { listBankController, createBankController, updateBankController, deleteBankController, createAccountController, listAccountController } = require('./controllers')
const server = express();
//middlewares
server.use(bodyParser.json())

//routes
server.use(accountRoutes)
server.use(bankRoutes)
server.use(userRoutes)
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Person1:person1@cluster0.2hdoecz.mongodb.net/banks?retryWrites=true&w=majority",
    // { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(res => {
        server.listen(4000, () => console.log('Server is ready'))
    }).catch(err => console.log(err))

//Running the server
