import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {initDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import job from './config/cron.js';

import transactionRoutes from './routes/transactionsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// start cron job
if(process.env.NODE_ENV === 'production'){
  job.start();
}

// middleware
app.use(cors()); // Enable CORS for all origins
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

