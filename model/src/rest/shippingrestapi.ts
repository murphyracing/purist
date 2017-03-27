import * as pg from 'pg';
import {NextFunction, Request, Response} from "express";

const connectionString = process.env.SCHIST_DB || 'postgres://localhost:5432/schist';

class ApiV1 {
  public post(req: Request, res: Response, next: NextFunction): void {
    /* Turn the REST POST into a DB INSERT */
    let results = [];
    const data = {text: req.body.text, complete: false};

    // get a database connection from the pool and insert and item
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
export default new ApiV1();
