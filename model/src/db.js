"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectDb = require('pg-promise')();
var Db = (function () {
    function Db() {
        this.url = process.env.PURIST_DB || 'postgres://localhost:5432/purist';
        this.db = connectDb(this.url);
    }
    return Db;
}());
exports.default = new Db().db;
//# sourceMappingURL=db.js.map