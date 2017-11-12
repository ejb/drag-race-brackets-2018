const http = require('http');
const express = require('express');
const Session = require('express-session');
 
const app = express();
app.use(Session({
    secret: 'raysources-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));

require('./app/routes')(app);
 
const port = process.env.PORT || 1234;
const server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
    console.log(`listening to ${port}`);
});

