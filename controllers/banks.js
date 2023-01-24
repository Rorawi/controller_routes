const BankModel = require('../models/bank');
const accountModel = require('../models/account');
const { validationResult } = require('express-validator');
const listBankController = (req, res) => {
    // const banks = BankModel.all();
    const { id } = req.params

    if (id) {
        BankModel.find({ _id: id }).then(banks => {
            res.json({ data: banks });
        }).catch(err => console.log(err));

    }
    else {
        BankModel.find().then(banks => {
            res.json({ data: banks });
        }).catch(err => console.log(err));
    }

}

const createBankController = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return res.json({message: errors.array()[0].msg})
    }
    const { name, location, branch, phone, address, accountNumber } = req.body
     
  
    const bank = new BankModel({ name, location, branch, phone, address, accountNumber });
    bank.save().then(result => {
        res.json({ message: "create successful", data: bank })

    }).catch(error => console.log(error));

}

const updateBankController = (req, res) => {
    const { id, name, location, branch, phone, address, accountNumber } = req.body

    BankModel.find({ _id: id }).then(banks => {
        if (banks.length > 0) {
            banks[0].name = name;
            banks[0].location = location;
            banks[0].branch = branch;
            banks[0].phone = phone;
            banks[0].address = address;
            banks[0].accountNumber = accountNumber;


            banks[0].save();
            res.json({ message: "update successful", data: banks[0] })
        }

        res.json({ message: "Document cannot be found" })

    }).catch(err => console.log(err))
    // const updatedBank = BankModel.update({name,location,branch,phone,address,accountNumber})

    // res.json({message: "update successful", data: updatedBank})
}

const deleteBankController = (req, res) => {
    const { id } = req.body
    BankModel.findByIdAndRemove(id).then(deletedBank => {
        if (deletedBank) {
            accountModel.deleteMany({ bankId: deletedBank._id }).then(result => {
               res.json({ message: "bank deleted", data: deletedBank })
            }).catch(err => console.log(err))
            return;
        }
        res.json({ message: "Bank not found" })
    })
}


module.exports = {
    listBankController,
    createBankController,
    updateBankController,
    deleteBankController
}