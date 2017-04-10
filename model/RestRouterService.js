"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_1 = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var PaymentsApi_1 = require("./src/PaymentsApi");
// Creates and configures an ExpressJS web server.
var RestRouterService = (function () {
    //Run configuration methods on the Express instance.
    function RestRouterService(msgRouter, port) {
        this.msgRouter = msgRouter;
        this.payApi = new PaymentsApi_1.PaymentsApi(msgRouter);
        this.express = express();
        this.express.set('port', port);
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    RestRouterService.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.91:4200');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            next();
        });
    };
    // Configure API rest.
    RestRouterService.prototype.routes = function () {
        var _this = this;
        this.express.use('/payments', express_1.Router()
            .get('/', function (req, res, next) { return _this.payApi.getAll(req, res, next); })
            .post('/', function (req, res, next) { return _this.payApi.post(req, res, next); })
            .put('/:id', function (req, res, next) { return _this.payApi.updateOne(req, res, next); }));
    };
    return RestRouterService;
}());
exports.RestRouterService = RestRouterService;
;
//# sourceMappingURL=RestRouterService.js.map