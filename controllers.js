let BankModel = require('./model');

//Controllers/Request handlers
const listBankController =(req,res)=> {
    // const banks = BankModel.all();
    const {id} = req.params

    if(id){
        BankModel.find({_id: id}).then(banks=> {
            res.json({data: banks});
            }).catch(err=> console.log(err));
       
    }
    else {
        BankModel.find().then(banks=> {
            res.json({data: banks});
            }).catch(err=> console.log(err));
    }
   
}

const createBankController =(req,res)=> {
    const {name,location,branch,phone,address,accountNumber} = req.body

    const bank = new BankModel({name,location,branch,phone,address,accountNumber});
    bank.save().then(result => {
        res.json({message: "create successful", data:bank})

    }).catch(error => console.log(error));

}

// const updateBankController =(req,res)=> {
//     const {name,location,branch,phone,address,accountNumber} = req.body
     
//     const updatedBank = BankModel.update({name,location,branch,phone,address,accountNumber})

//     res.json({message: "update successful", data: updatedBank})
// }

// const deleteBankController =(req,res)=> {
//     const {name} = req.body
//     const deletedBank =  BankModel.delete({name});
//     res.json({message: "bank deleted", data: deletedBank})
// }

module.exports = {
    listBankController,
    createBankController,
    // updateBankController,
    // deleteBankController
}