const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController');
const ensureAuthenticated = require('../middlewares/Auth'); // ✅ Add this line

const router = require('express').Router();

// ✅ Protect each route using the middleware
router.get('/', ensureAuthenticated, fetchExpenses);
router.post('/', ensureAuthenticated, addExpenses);
router.delete('/:expenseId', ensureAuthenticated, deleteExpenses);

module.exports = router;
