
const express = require('express');

const expenseController = require('../controllers/expense');
const userauthentication=require('../middleware/auth')
;
const router = express.Router();

router.post('/add-expense',userauthentication.authenticate,expenseController.postAddExpense);

router.get('/get-expenses',userauthentication.authenticate,expenseController.getExpenses);

router.delete('/delete-expense/:id',userauthentication.authenticate,expenseController.deleteExpense);





module.exports = router;
