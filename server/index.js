'use strict'

var app = require('./server');

var port = '3800';

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});