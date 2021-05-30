const mysql = require('mysql');
require('dotenv').config();


const pool= mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = pool;