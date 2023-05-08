require('dotenv').config();
const express = require('express');
const {dbConnectMySql} = require('./config/mySql');
const cors = require('cors');
//const bodyParser = require('body-parser');

const app = express();
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('storage/tiendas/products'));
app.use(express.static('storage/tiendas/profile'));
app.use(express.static('storage/usersProfile'));
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
app.use("/api", require("./routes"));

dbConnectMySql();