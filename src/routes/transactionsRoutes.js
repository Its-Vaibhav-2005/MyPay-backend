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

// 2. get transaction by userId
router.get('/:userId', getTransactionsByUserId)

// 3. delete transaction by id
router.delete('/:id', deleteTransactionById) 

// 4. summary of transactions by userId
router.get('/summary/:userId', getTransactionSummaryByUserId)


export default router;