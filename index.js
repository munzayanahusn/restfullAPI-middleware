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
const movies = require('./routes/movies.js');
const users = require('./routes/users.js');

app.use('/movies', movies);
app.use('/users', users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});