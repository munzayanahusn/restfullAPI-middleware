const swaggerOptions = {
    definition: {
        swagger: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
            description: 'API untuk manajemen film',
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;