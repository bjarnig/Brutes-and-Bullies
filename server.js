const express = require('express');
const path = require('path');
const app = express();

/* - Sockets - */

require('./ws');


/* - Serve - */

app.get('/', function(_, res) {
    res.sendFile(__dirname + '/terra.html');
});

app.get('/client.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/client.js'));
});

app.get('/terra.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/lib/terra.js'));
});

app.get('/terra-app.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/terra-app.js'));
});

app.get('/terra-utils.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/terra-utils.js'));
});


/* - Listen - */

app.listen(3000, function() {
    console.log('\x1b[36m%s\x1b[0m', '***  Brutes and Bullies (server) started *** ');
});