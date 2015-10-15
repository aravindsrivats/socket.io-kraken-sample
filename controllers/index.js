'use strict';

module.exports = function(router) {
    router.get('/', function(req, res) {
        res.render('index', {
            appname: 'Sample Websocket App with Kraken.js and Socket.io'
        });
    });
};
