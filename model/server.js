"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socketIO = require("socket.io");
var RestRouterService_1 = require("./RestRouterService");
var MessageRouter_1 = require("./src/MessageRouter");
var Server = (function () {
    function Server(msgRouter) {
        this.msgRouter = msgRouter;
        this.port = process.env.PORT || Server.PORT;
        this.rest = new RestRouterService_1.RestRouterService(msgRouter, this.port);
        this.server = http.createServer(this.rest.express);
        this.io = socketIO(this.server);
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
            _this.msgRouter.addSink(function (msg) {
                _this.io.emit('message', msg);
            });
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    return Server;
}());
Server.PORT = 3000;
var msgRouter = new MessageRouter_1.MessageRouter();
var server = new Server(msgRouter);
server.listen();
//# sourceMappingURL=server.js.map