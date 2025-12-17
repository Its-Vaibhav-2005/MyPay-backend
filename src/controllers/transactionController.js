import { sql } from '../config/db.js';

async function getAllTransactions(req, res){
    try{
        const {title, amount, category, userId} = req.body;
        if(!title || amount===undefined || !category || !userId){
            return res.status(400).json({
                msg:"All fields are required"
            })
        }

        const transaction = await sql`INSERT INTO transactions (title, amount, category, userId) VALUES (${title}, ${amount}, ${category}, ${userId}) RETURNING *`;

        res.status(201).json({
            msg:"Successfully added transaction",
            transaction: transaction[0]
        })
    }catch(err){
            res.status(500).json({
                msg:"Sorry, It's not you, it's us. Please try again later.",
                "error": err.message
            })
    }
}

async function getTransactionsByUserId(req, res){
    try{
        const {userId} = req.params;
        const transactions = await sql`SELECT * FROM transactions WHERE userId = ${userId} ORDER BY createdAt DESC`;
        res.status(200).json({
            "transactions": transactions
        });
    }catch(err){
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later.",
            "error": err.message
        })
    }
}

async function deleteTransactionById(req, res){
try{
        const {id} = req.params;

        if(isNaN(parseInt(id))){
            return res.status(400).json({
                msg: "Transaction ID must be integer"
            });
        }

        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
        if (result.length === 0){
            return res.status(404).json({
                msg: "Transaction not found"
            });
        }
        res.status(200).json({
            "msg": "Transaction deleted successfully",
            "result": result
        });
    }catch(err){
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later.",
            "error": err.message
        })
    }
}

async function getTransactionSummaryByUserId(req, res){
    try{
        const {userId} = req.params;
        const balance = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE userId = ${userId};
        `;
        const income = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE userId = ${userId} AND amount > 0;
        `;      
        const expense = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE userId = ${userId} AND amount < 0;
        `;
        res.status(200).json({
            "balance": balance[0].balance,
            "income": income[0].income,
            "expense": expense[0].expense
        });
        
    }catch(err){
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later.",
            "error": err.message
        })
    }

}

export { getAllTransactions, getTransactionsByUserId, deleteTransactionById, getTransactionSummaryByUserId };