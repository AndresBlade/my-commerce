import express from "express";
import cors from "cors";
import router from './routes/index'
import 'dotenv/config'
import {dbConnectMySql} from './config/db'


const PORT = process.env.PORT || 3001
const app = express();
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnectMySql();
