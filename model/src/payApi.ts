import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import db from './db';

class PayApi {
  public subscribePush(req: Request, res: Response, next: NextFunction): void {

  } /* ==== subscribePush ==== */

  public getAll(req: Request, res: Response, next: NextFunction): void {
    const results = [];
    let query = `
      SELECT
        vendor.label AS "vendor",
        customer.label AS "customer",
        invoice.label AS "invoice",
        payable.amount AS "amount",
        payable.approvedOn AS "approved",
        "check".number AS "check #",
        ccType.label AS "cc type",
        payment.cclastfour AS "cc"
      FROM pay.payment
      LEFT OUTER JOIN pay.payable ON payment.payableId = pay.payable.id
      LEFT OUTER JOIN pay."check" ON payment.checkId = pay."check".id
      LEFT OUTER JOIN pay.ccType ON payment.ccTypeId = pay.ccType.id
      LEFT OUTER JOIN vendor ON payable.vendorId = vendor.id
      LEFT OUTER JOIN customer ON payable.customerId = customer.id
      LEFT OUTER JOIN invoice ON payable.invoiceId = invoice.id
    `;

    db.each(query, [], (row) => {
      results.push(row);
    })
    .then(data => {
      res.json(results);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({success: false, error: error});
    });
  } /* ==== GET all ==== */


  public post(req: Request, res: Response, next: NextFunction): void {
    /* Insert a new signal from the given object */
    const m = req.body;

    /* db transaction */
    pg.connect('postgres://localhost:5432/purist', (error, client, done) => {
      if (error) {
        done();
        console.log(error);
        return res.status(500).json({success: false, error: error});
      }

      client.query(
        'INSERT INTO ' +
          'signal(date, signalTypeId, subject, qtyTypeId, qty, purchaseNumId, vendorId, tracking)' +
          'VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
          [m.date, m.signalTypeId, m.subject, m.qtyTypeId, m.qty, m.purchaseNumId, m.vendorId, m.tracking]
      ).then(() => {
          console.log("[ INSERT ] ", JSON.stringify(m));
          res.json({success: true});
        })
        .catch(error => {
          console.error("[ INSERT ] ", error);
          res.json({success: false, error: error});
        });
    });
    /* -- db transaction -- */

  } /* ==== POST ==== */
}
export default new PayApi();
