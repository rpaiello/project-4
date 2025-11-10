const sql = require('mysql2/promise');

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'p4logins',
    password: 'admin', //YOUR LOCALHOST MYSQL PASSWORD HERE
    waitForConnections: true,
    connectionLimit: 40,
    queueLimit: 0,
})

module.exports = pool;