import 'dotenv/config';
import express from "express";
import cors from "cors";
import router from './routes/index'
import {dbConnectMySql} from './config/db'

const PORT = process.env['PORT'] || 3000
const app = express();

app.use(express.static('storage/tiendas/products'));
app.use(express.static('storage/tiendas/profile'));
app.use(express.static('storage/usersProfile'));
app.use(express.static('storage')); 
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnectMySql();
