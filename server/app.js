(function(){
    'use strict';

    var WebSocket = require('faye-websocket');
    var http = require('http');

    var server = http.createServer();

    server.on('upgrade', function(request, socket, body) {
        if (WebSocket.isWebSocket(request)) {
            var ws = new WebSocket(request, socket, body);

            // ws.on('message', function(event) {
            //   ws.send(event.data);
            // });

            setInterval(function(){
                ws.send(new Date().toLocaleTimeString());
            }, 1000);

            ws.on('close', function(event) {
                console.log('close', event.code, event.reason);
                ws = null;
            });
        }
    });

    server.listen(8000);
})();
