const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// Implementasi logging
app.use(morgan('common'));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import router

app.listen(3000);