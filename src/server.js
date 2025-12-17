import express from 'express';
import dotenv from 'dotenv';
import {initDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

import transactionRoutes from './routes/transactionsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(rateLimiter)

// home route
app.get('/', (req, res)=>{
    res.send("Hello from MyPay Backend");
})

// routes
app.use('/api/transactions', transactionRoutes);

initDB().then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}: http://127.0.0.1:${PORT}`);
        })
    }
)

