const accountModel = require("../models/account")


const createAccountController = (req, res) => {
    const { name, number, accountType, bankId } = req.body;
    const account = new accountModel({ name, number, accountType, bankId });
    account.save().then(result => {
        if (result)
            res.json({ message: "Account created", data: result })
        else
            res.json({ message: "Failed to create account" });
    })
}

const listAccountController = (req, res) => {
    accountModel.find()
        .populate("bankId", "name location branch")
        .then(accounts => {
            res.json({ data: accounts })
        }).catch(err => console.log(err))

    const { id } = req.params
    if (id) {
        accountModel.find({ _id: id }).then(account => {
            res.json({ data: account })
        }).catch(err => console.log(err))
    }

    else {
        accountModel.find().then(account => {
            res.json({ data: account })
        }).catch(err => console.log(err))
    }
}

module.exports = {
    createAccountController,
    listAccountController
}