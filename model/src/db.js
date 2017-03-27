"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Db = (function () {
    function Db() {
        this.url = process.env.PURIST_DB || 'postgres://localhost:5432/purist';
    }
    return Db;
}());
exports.default = new Db();
//# sourceMappingURL=db.js.map