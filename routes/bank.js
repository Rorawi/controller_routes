const express = require("express")
const {listBankController, createBankController, updateBankController, deleteBankController} = require("../controllers/banks")
const router = express.Router();

router.get('/banks/:id?',listBankController)
router.post('/bank', createBankController)
router.put('/bank',updateBankController)
router.delete('/bank',deleteBankController)

module.exports = router