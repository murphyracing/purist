"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var db_1 = require("./db");
var PayApi = (function () {
    function PayApi() {
    }
    PayApi.prototype.subscribePush = function (req, res, next) {
    }; /* ==== subscribePush ==== */
    PayApi.prototype.getAll = function (req, res, next) {
        var results = [];
        var query = "\n      SELECT\n        vendor.label AS \"vendor\",\n        customer.label AS \"customer\",\n        invoice.label AS \"invoice\",\n        payable.amount AS \"amount\",\n        payable.approvedOn AS \"approved\",\n        \"check\".number AS \"check #\",\n        ccType.label AS \"cc type\",\n        payment.cclastfour AS \"cc\"\n      FROM pay.payment\n      LEFT OUTER JOIN pay.payable ON payment.payableId = pay.payable.id\n      LEFT OUTER JOIN pay.\"check\" ON payment.checkId = pay.\"check\".id\n      LEFT OUTER JOIN pay.ccType ON payment.ccTypeId = pay.ccType.id\n      LEFT OUTER JOIN vendor ON payable.vendorId = vendor.id\n      LEFT OUTER JOIN customer ON payable.customerId = customer.id\n      LEFT OUTER JOIN invoice ON payable.invoiceId = invoice.id\n    ";
        db_1.default.each(query, [], function (row) {
            results.push(row);
        })
            .then(function (data) {
            res.json(results);
        })
            .catch(function (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: error });
        });
    }; /* ==== GET all ==== */
    PayApi.prototype.post = function (req, res, next) {
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
    return PayApi;
}());
exports.default = new PayApi();
//# sourceMappingURL=payApi.js.map