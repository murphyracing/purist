"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var db_1 = require("./db");
var PurchasesRestApi = (function () {
    function PurchasesRestApi() {
    }
    PurchasesRestApi.prototype.getAll = function (req, res, next) {
        var results = [];
        var query = 'SELECT ' +
            'signal.id, signal.date, signalTypeId, signalType.signalType, qtyTypeId, qtyType.qtyType,' +
            'signal.qty, signal.subject, ' +
            'purchaseNum.groupId, purchaseGroup.group, purchaseNum.member, vendorId, vendor.label, ' +
            'signal.tracking ' +
            'FROM signal ' +
            'JOIN signalType ON signal.signalTypeId = signalType.id ' +
            'JOIN qtyType ON signal.qtyTypeId = qtyType.id ' +
            'JOIN purchaseNum  ON signal.purchaseNumId = purchaseNum.id ' +
            'JOIN purchaseGroup ON purchaseNum.groupId = purchaseGroup.id ' +
            'JOIN vendor ON signal.vendorId = vendor.id';
        db_1.default.each(query, [], function (sig) {
            results.push(sig);
        })
            .then(function (data) {
            res.json(results);
        })
            .catch(function (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: error });
        });
    }; /* ==== GET all ==== */
    PurchasesRestApi.prototype.post = function (req, res, next) {
        /* Insert a new signal from the given object */
        var m = req.body;
        /* db transaction */
        pg.connect('postgres://localhost:5432/purist', function (error, client, done) {
            if (error) {
                done();
                console.log(error);
                return res.status(500).json({ success: false, error: error });
            }
            client.query('INSERT INTO ' +
                'signal(date, signalTypeId, subject, qtyTypeId, qty, purchaseNumId, vendorId, tracking)' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [m.date, m.signalTypeId, m.subject, m.qtyTypeId, m.qty, m.purchaseNumId, m.vendorId, m.tracking]).then(function () {
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
//# sourceMappingURL=purchaseApi.js.map