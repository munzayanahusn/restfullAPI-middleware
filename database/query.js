const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies',
    password: 'mhsITB313',
    port: 5432,
});

module.exports = pool;