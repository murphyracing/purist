"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var purchases_1 = require("../purchases");
var db_1 = require("../db");
var PurchasesRestApi = (function () {
    function PurchasesRestApi() {
    }
    PurchasesRestApi.prototype.getAll = function (req, res, next) {
        var obj = [
            { subject: 'test' },
            { subject: 'hello, world!' },
            { subject: 'like being a kid again' }
        ];
        res.json(obj);
    };
    PurchasesRestApi.prototype.post = function (req, res, next) {
        /* Insert a new signal from the given object */
        var data = req.body;
        console.log(data);
        var m = new purchases_1.Signal();
        m.type = new purchases_1.SignalType(data.type_id);
        m.date = data.date;
        m.subject = data.subject;
        m.qtyType = new purchases_1.QtyType(data.qty_type);
        m.qty = data.qty;
        m.vendor = new purchases_1.Vendor(data.vendor);
        m.po = new purchases_1.PoNum(data.po);
        m.tracking = data.tracking;
        /* db transaction */
        pg.connect(db_1.default.url, function (err, client, done) {
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            client.query('INSERT INTO ' +
                'signal(date, signaltype_id, subject, qtytype_id, qty, ponum_id, vendor_id, tracking)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [m.date, m.type.id, m.subject, m.qtyType.id, m.qty, m.po.id, m.vendor.id, m.tracking]).then(function () {
                console.log("[ INSERT ] ", JSON.stringify(m));
                res.json({ success: true });
            })
                .catch(function (error) {
                console.error("[ INSERT ] ", error);
                res.json({ success: false, error: error });
            });
        });
        /* -- db transaction -- */
    }; /* ==== POST ==== */
    return PurchasesRestApi;
}());
exports.default = new PurchasesRestApi();
//# sourceMappingURL=purchasesrestapi.js.map