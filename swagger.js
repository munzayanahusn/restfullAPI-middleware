const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Movies API',
        version: '1.0.0',
        description: 'API untuk manajemen film',
    },
    apis: ['./routes/*.js'],
};

console.log('Swagger Options:', swaggerOptions);

module.exports = swaggerOptions;