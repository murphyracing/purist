"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var connectionString = process.env.SCHIST_DB || 'postgres://localhost:5432/schist';
var ApiV1 = (function () {
    function ApiV1() {
    }
    ApiV1.prototype.post = function (req, res, next) {
        /* Turn the REST POST into a DB INSERT */
        var results = [];
        var data = { text: req.body.text, complete: false };
        // get a database connection from the pool and insert and item
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
    return ApiV1;
}());
exports.default = new ApiV1();
//# sourceMappingURL=api.js.map