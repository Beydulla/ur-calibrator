import config from 'config';
const mysql = require('mysql');

const mc = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: dbv.config.password,
    database: db.config.database
});
 
// connect to database
mc.connect();

module.exports = mc; 