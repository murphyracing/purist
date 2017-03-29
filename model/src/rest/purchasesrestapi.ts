import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import {PoNum, QtyType, Signal, SignalType, Vendor} from '../purchases';
import db from '../db';

class PurchasesRestApi {
  public getAll(req: Request, res: Response, next: NextFunction): void {
    const results = [];
    const query =
        'SELECT ' +
        'signal.id, signal.date, signaltype_id, signaltype.signaltype, qtytype_id, qtytype.qtytype,' +
        'signal.qty, signal.subject, ' +
        'ponum.group_id, ponum_group.group, ponum.member, vendor_id, vendor.business_name, ' +
        'signal.tracking ' +
        'FROM signal ' +
        'JOIN signaltype ON signal.signaltype_id = signaltype.id ' +
        'JOIN qtytype ON signal.qtytype_id = qtytype.id ' +
        'JOIN ponum  ON signal.ponum_id = ponum.id ' +
        'JOIN ponum_group ON ponum.group_id = ponum_group.id ' +
        'JOIN vendor ON signal.vendor_id = vendor.id';
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
          'signal(date, signaltype_id, subject, qtytype_id, qty, ponum_id, vendor_id, tracking)' +
          'VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
          [m.date, m.signaltype_id, m.subject, m.qtytype_id, m.qty, m.ponum_id, m.vendor_id, m.tracking]
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
