"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socketIO = require("socket.io");
var RestRouterService_1 = require("./RestRouterService");
var Server = (function () {
    function Server() {
        this.port = process.env.PORT || Server.PORT;
        this.rest = new RestRouterService_1.RestRouterService(this.port);
        this.server = http.createServer(this.rest.express);
        this.io = socketIO(this.server);
        this.io.set('origins', 'http://192.168.2.91:4200');
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            var i = 0;
            setInterval(function () { return _this.io.emit('message', ++i); }, 1000);
            socket.on('message', function (m) {
                console.log('[server](message): %s', JSON.stringify(m));
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    return Server;
}());
Server.PORT = 3000;
var server = new Server();
server.listen();
//# sourceMappingURL=server.js.map