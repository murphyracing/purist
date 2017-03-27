"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_1 = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var purchasesrestapi_1 = require("./src/rest/purchasesrestapi");
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
    };
    // Configure API rest.
    Web.prototype.routes = function () {
        this.express.use('/purchases', express_1.Router()
            .post('/', function (req, res, next) { return purchasesrestapi_1.default.post(req, res, next); }));
    };
    return Web;
}());
exports.default = new Web().express;
//# sourceMappingURL=web.js.map