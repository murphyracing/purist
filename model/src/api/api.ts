import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import {DateType, PoNum, QtyType, Signal, SignalType, Vendor} from "../model";

const connectionString = process.env.PURIST_DB || 'postgres://localhost:5432/purist';

class Api {
  public post(req: Request, res: Response, next: NextFunction): void {
    /* Insert a new signal from the given object */
    const data = JSON.parse(req.body);

    let model = new Signal();
      model.type = new SignalType(data.type_id);
      model.dateType = new DateType(data.dateType);
      model.date = data.date;
      model.subject = data.subject;
      model.qtyType = new QtyType(data.qtyType);
      model.qty = data.qty;
      model.vendor = new Vendor(data.vendor);
      model.po = new PoNum(data.po);
      model.tracking = data.tracking;

    // get a database connection from the pool and insert an item
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        // no DB connection
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      // SQL injection
      client.query('INSERT INTO items(text, complete) VALUES($1, $2)', [data.text, data.complete])
          .then(() => {
            console.log("[ INSERT ] ", data.text);
            res.json({success: true});
          })
          .catch(error => {
            console.error("[ INSERT ] ", error);
            res.json({success: false, error: error});
          });
    });
    /* pg.connect */
  } /* ==== POST ==== */
}
export default new Api();
