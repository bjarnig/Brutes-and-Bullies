let express = require('express');
let path = require('path');
let app = express();

/* - Serve the ws.html - */

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/terra.html');
});

/* - Serve the references - */

app.get('/client.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/client.js'));
});

app.get('/terra.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/lib/terra.js'));
});

app.get('/terra-app.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/apps/terra-app.js'));
});

/* - Listen - */

app.listen(3000, function() {
    console.log('### scjs server started ### ')
});