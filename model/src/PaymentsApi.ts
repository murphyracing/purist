import * as pg from 'pg';
import {NextFunction, Request, Response} from 'express';
import db from './db';
import {MessageRouter} from "./MessageRouter";

interface FieldUpdate {
  field: string;
  value: string;
}

export class PaymentsApi {
  constructor (private msgRouter: MessageRouter) {}

  public updateOne(req: Request, res: Response, next: NextFunction): void {
    const paymentId: number = req.params.id;

    const requestedUpdates: FieldUpdate[] = req.body;
    const committedUpdates: FieldUpdate[] = [];

    for (const update of requestedUpdates) {
      if (update.field === 'amount') {
        db.query(`
          UPDATE pay.payable
          SET amount = '${update.value}'
          WHERE id = 
            (SELECT payableId FROM pay.payment WHERE payment.id = ${paymentId});`)
        .then(() => {
          // committedUpdates.push(update);
          const updateMsg = { method: 'update', id: paymentId, updates: [ update ] };
          this.msgRouter.post(updateMsg);
          res.json({success: true, message: updateMsg});
        })
        .catch(e => {
          console.error("[ INSERT ] ", e);
          res.json({success: false, error: e.message});
        });
      } else {
        const e = new Error('Editing field \'' + update.field + '\' is not supported yet :(');
        console.error(e);
        res.json({success: false, error: e.message});
      }
    }
  } /* ==== updateOne ==== */

  public getAll(req: Request, res: Response, next: NextFunction): void {
    const results = [];
    const query = `
      SELECT
        payment.id as "id",
        
        payable.vendorId AS "vendorId",
        vendor.label AS "vendor",
        
        payable.customerId AS "customerId",
        customer.label AS "customer",
        
        payable.invoiceId AS "invoiceId",
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
};
