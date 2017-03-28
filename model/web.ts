import * as path from 'path';
import * as express from 'express';
import {Router} from "express";
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import PurchasesRestApi from './src/rest/purchasesrestapi';

// Creates and configures an ExpressJS web server.
class Web {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(cookieParser());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API rest.
  private routes(): void {
    this.express.use(
        '/purchases', Router()
            .get('/', (req, res, next) => PurchasesRestApi.getAll(req, res, next))
            .post('/', (req, res, next) => PurchasesRestApi.post(req, res, next))
    );
  }


}
export default new Web().express;
