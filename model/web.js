"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_1 = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var payApi_1 = require("./src/payApi");
var purchaseApi_1 = require("./src/purchaseApi");
// Creates and configures an ExpressJS web server.
var Web = (function () {
    //Run configuration methods on the Express instance.
    function Web() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    Web.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            next();
        });
    };
    // Configure API rest.
    Web.prototype.routes = function () {
        this.express.use('/purchase', express_1.Router()
            .get('/', function (req, res, next) { return purchaseApi_1.default.getAll(req, res, next); })
            .post('/', function (req, res, next) { return purchaseApi_1.default.post(req, res, next); }));
        this.express.use('/pay', express_1.Router()
            .get('/', function (req, res, next) { return payApi_1.default.getAll(req, res, next); })
            .post('/', function (req, res, next) { return payApi_1.default.post(req, res, next); }));
    };
    return Web;
}());
exports.default = new Web().express;
//# sourceMappingURL=web.js.map