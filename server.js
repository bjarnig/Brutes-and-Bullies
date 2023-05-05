const express = require('express');
const path = require('path');
const app = express();


/* - Sockets - */

require('./ws');


/* - Serve - */

app.get('/', function(_, res) {
    res.sendFile(__dirname + '/terra.html');
});

app.get('/hydra', function(_, res) {
    res.sendFile(__dirname + '/views/hydra.html');
});

app.get('/client.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/client.js'));
});

app.get('/terra.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/lib/terra.js'));
});

app.get('/hydra-synth.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/lib/hydra-synth.js'));
});

app.get('/terra-app.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/terra-app.js'));
});

app.get('/terra-utils.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/terra-utils.js'));
});

app.get('/hydra-app.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/hydra-app.js'));
});

app.get('/hydra-redirect.js', function(_, res) {
    res.sendFile(path.join(__dirname + '/apps/hydra-redirect.js'));
});

app.get('/hydraa', function(_, res) {
    res.sendFile(__dirname + '/views/hydraa.html');
});

app.get('/hydrab', function(_, res) {
    res.sendFile(__dirname + '/views/hydrab.html');
});

app.get('/hydrac', function(_, res) {
    res.sendFile(__dirname + '/views/hydrac.html');
});

app.get('/hydrad', function(_, res) {
    res.sendFile(__dirname + '/views/hydrad.html');
});

app.get('/hydrae', function(_, res) {
    res.sendFile(__dirname + '/views/hydrae.html');
});

app.get('/hydraf', function(_, res) {
    res.sendFile(__dirname + '/views/hydraf.html');
});

app.get('/hydrag', function(_, res) {
    res.sendFile(__dirname + '/views/hydrag.html');
});

app.get('/hydrah', function(_, res) {
    res.sendFile(__dirname + '/views/hydrah.html');
});

app.get('/hydrai', function(_, res) {
    res.sendFile(__dirname + '/views/hydrai.html');
});

app.get('/hydraj', function(_, res) {
    res.sendFile(__dirname + '/views/hydraj.html');
});

app.get('/hydrak', function(_, res) {
    res.sendFile(__dirname + '/views/hydrak.html');
});

app.get('/hydral', function(_, res) {
    res.sendFile(__dirname + '/views/hydral.html');
});

app.get('/hydram', function(_, res) {
    res.sendFile(__dirname + '/views/hydram.html');
});

app.get('/hydran', function(_, res) {
    res.sendFile(__dirname + '/views/hydran.html');
});

app.get('/hydrao', function(_, res) {
    res.sendFile(__dirname + '/views/hydrao.html');
});

app.get('/hydrap', function(_, res) {
    res.sendFile(__dirname + '/views/hydrap.html');
});

app.get('/hydrar', function(_, res) {
    res.sendFile(__dirname + '/views/hydrar.html');
});

app.get('/hydras', function(_, res) {
    res.sendFile(__dirname + '/views/hydras.html');
});

app.get('/hydrat', function(_, res) {
    res.sendFile(__dirname + '/views/hydrat.html');
});

app.get('/ca.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/ca.mov'));
});

app.get('/caseq.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/caseq.mov'));
});

app.get('/caseq.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/caseq.mov'));
});

app.get('/reca.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/reca.mov'));
});

app.get('/recb.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recb.mov'));
});

app.get('/recc.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recc.mov'));
});

app.get('/recd.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recd.mov'));
});

app.get('/rece.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/rece.mov'));
});

app.get('/recf.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recf.mov'));
});

app.get('/recg.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recg.mov'));
});

app.get('/rech.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/rech.mov'));
});

app.get('/reci.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/reci.mov'));
});

app.get('/recj.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recj.mov'));
});

app.get('/reck.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/reck.mov'));
});

app.get('/recl.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recl.mov'));
});

app.get('/recm.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recm.mov'));
});

app.get('/recn.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recn.mov'));
});

app.get('/reco.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/reco.mov'));
});

app.get('/recp.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recp.mov'));
});

app.get('/recr.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recr.mov'));
});

app.get('/recs.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/recs.mov'));
});

app.get('/rect.mov', function(_, res) {
    res.sendFile(path.join(__dirname + '/res/rect.mov'));
});

/* - Listen - */

app.listen(3000, function() {
    console.log('\x1b[36m%s\x1b[0m', '*** Brutes and Bullies (server) started *** ');
});
