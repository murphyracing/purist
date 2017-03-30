import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import db from './db';

class PurchasesRestApi {
  public getAll(req: Request, res: Response, next: NextFunction): void {
    const results = [];
    const query =
        'SELECT ' +
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
    db.each(query, [], (sig) => {
        results.push(sig);
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
export default new PurchasesRestApi();
