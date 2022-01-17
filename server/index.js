const express = require('express');
const app = express();
const port = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

app.listen(port,()=>{
  console.log("backend server is running on port 8800");
});
