"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var model_1 = require("../model");
var connectionString = process.env.PURIST_DB || 'postgres://localhost:5432/purist';
var Api = (function () {
    function Api() {
    }
    Api.prototype.post = function (req, res, next) {
        /* Insert a new signal from the given object */
        var data = JSON.parse(req.body);
        var model = new model_1.Signal();
        model.type = new model_1.SignalType(data.type_id);
        model.dateType = new model_1.DateType(data.dateType);
        model.date = data.date;
        model.subject = data.subject;
        model.qtyType = new model_1.QtyType(data.qtyType);
        model.qty = data.qty;
        model.vendor = new model_1.Vendor(data.vendor);
        model.po = new model_1.PoNum(data.po);
        model.tracking = data.tracking;
        // get a database connection from the pool and insert an item
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                // no DB connection
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL injection
            client.query('INSERT INTO items(text, complete) VALUES($1, $2)', [data.text, data.complete])
                .then(function () {
                console.log("[ INSERT ] ", data.text);
                res.json({ success: true });
            })
                .catch(function (error) {
                console.error("[ INSERT ] ", error);
                res.json({ success: false, error: error });
            });
        });
        /* pg.connect */
    }; /* ==== POST ==== */
    return Api;
}());
exports.default = new Api();
//# sourceMappingURL=api.js.map