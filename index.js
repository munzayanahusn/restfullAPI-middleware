const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerOptions = require('./swagger.js'); // Import konfigurasi Swagger
const swaggerUi = require('swagger-ui-express');
const app = express();

// Implementasi logging
app.use(morgan('common'));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// implement router
const movies = require('./routes/movies.js');
const users = require('./routes/users.js');

app.use('/movies', movies);
app.use('/users', users);

// Spesifikasi Swagger
const swaggerSpecs = swaggerOptions;
swaggerSpecs.openapi = '3.0.0';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});