import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import {PoNum, QtyType, Signal, SignalType, Vendor} from '../purchases';
import Db from '../db';

class PurchasesRestApi {
  public post(req: Request, res: Response, next: NextFunction): void {
    /* Insert a new signal from the given object */
    const data = req.body;
    console.log(data);

    let m = new Signal();
      m.type = new SignalType(data.type_id);
      m.date = data.date;
      m.subject = data.subject;
      m.qtyType = new QtyType(data.qty_type);
      m.qty = data.qty;
      m.vendor = new Vendor(data.vendor);
      m.po = new PoNum(data.po);
      m.tracking = data.tracking;

    /* db transaction */
    pg.connect(Db.url, (err, client, done) => {
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      client.query(
        'INSERT INTO ' +
          'signal(date, signaltype_id, subject, qtytype_id, qty, ponum_id, vendor_id, tracking)' +
          'VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
          [m.date, m.type.id, m.subject, m.qtyType.id, m.qty, m.po.id, m.vendor.id, m.tracking]
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
