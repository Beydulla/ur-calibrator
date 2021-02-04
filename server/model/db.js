'user strict';
var config = require("../config");


var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;