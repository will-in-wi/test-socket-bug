(function(){
    'use strict';

    var http = require('http');
    var server = http.createServer();
    var io = require('socket.io')(server);


    io.on('connection', function(socket){
        console.log('a user connected');
    });

    server.listen(8000, function(){
        console.log('listening on *:8000');
    });

    setInterval(function(){
        io.emit('time', new Date().toLocaleTimeString());
    }, 1000);
})();
