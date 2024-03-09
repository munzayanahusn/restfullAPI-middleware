const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
            description: 'API untuk manajemen film',
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;