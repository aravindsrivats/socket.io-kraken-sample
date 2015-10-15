'use strict';

var express = require('express');
var debug = require('debug')('sample-app');
var kraken = require('kraken-js');

var options, app, io;

options = {
    onconfig: function(config, next) {
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

app.on('start', function() {
    app.listen(app.kraken.get('port')).on('listening', function() {
        debug('Lets start messaging.');
        io = require('socket.io')(this);
        io.on('connection', function(client) {
            debug('There is someone joining us.');

            client.on('send', function(data) {
                debug('Yay! Application works!');
                io.sockets.emit('message', data);
            });

            client.on('disconnect', function() {
                console.log('Sad! Someone just left.');
            });
        });
    });
});
