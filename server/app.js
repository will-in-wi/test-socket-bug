(function(){
    'use strict';

    var faye = require('faye');
    var http = require('http');

    var server = http.createServer(),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

    bayeux.attach(server);
    server.listen(8000);

    var client = bayeux.getClient();
    setInterval(function(){
        client.publish('/time', {
            currentTime: new Date().toLocaleTimeString()
        });
    }, 1000);
})();
