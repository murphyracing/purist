"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageRouter = (function () {
    function MessageRouter() {
        this.sinks = [];
    }
    MessageRouter.prototype.post = function (msg) {
        var _this = this;
        // Return immediately, but give the caller a way to see when their message's posted.
        return new Promise(function (resolve) {
            for (var i = 0; i < _this.sinks.length; ++i)
                _this.sinks[i](msg);
            resolve(msg);
        });
    };
    MessageRouter.prototype.addSink = function (sink) {
        this.sinks.push(sink);
    };
    return MessageRouter;
}());
exports.MessageRouter = MessageRouter;
//# sourceMappingURL=MessageRouter.js.map