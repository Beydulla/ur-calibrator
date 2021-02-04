require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var config = require('./config');
app = express();
var userRoutes = require('./routes/userRoutes');
var projectRoutes = require('./routes/projectRoutes');
var fileRoutes = require('./routes/fileRoutes');
var settingsRoutes = require('./routes/settingsRoute');
var paymentRoutes = require('./routes/paymentRoutes');
var schedule = require('node-schedule');
const userController = require('./controllers/userController');

 
schedule.scheduleJob('1 * * * * *', function(){
  userController.deleteExpiredUsers();
});
//app.use(cors({origin: config.ORIGIN}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

 
  
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/files', fileRoutes);
app.use('/settings', settingsRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;