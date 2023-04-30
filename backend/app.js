require('dotenv').config();
const express = require('express');
const {dbConnectMySql} = require('./config/mySql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('storage'));
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
app.use("/api", require("./routes"));
dbConnectMySql();