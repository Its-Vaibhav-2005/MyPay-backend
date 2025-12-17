import express from 'express';
import 
{ 
    getAllTransactions,
    getTransactionsByUserId,
    deleteTransactionById,
    getTransactionSummaryByUserId

} from '../controllers/transactionController.js';

const router = express.Router();

// 1. add transaction
router.post('/',getAllTransactions)

// 2. summary of transactions by userId (must be before /:userId to avoid route conflict)
router.get('/summary/:userId', getTransactionSummaryByUserId)

// 3. get transaction by userId
router.get('/:userId', getTransactionsByUserId)

// 4. delete transaction by id
router.delete('/:id', deleteTransactionById)


export default router;