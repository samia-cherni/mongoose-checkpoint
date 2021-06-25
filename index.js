const express = require("express");
require("dotenv").config();
const Connect = require("./config/Connect");
Connect();

const router=require('./routes/router')
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',router);


const port = 4000;
app.listen(port, () => {
  console.log(
    `Success! Your application is running on http://localhost:${port}`
  );
});