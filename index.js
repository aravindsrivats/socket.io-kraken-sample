'use strict';

var express = require('express');
var debug = require('debug')('sample-app');
var kraken = require('kraken-js');

var options, app, io;

options = {
    onconfig: function (config, next) {
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

app.on('start', function () {
    app.listen(app.kraken.get('port')).on('listening', function() {
		io = require('socket.io')(this);
        io.on('connection', function(client) {
            debug('Client connected through websockets');
        });
    });
});
