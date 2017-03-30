import * as path from 'path';
import * as express from 'express';
import {Router} from "express";
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import PayApi from './src/payApi';
import purchaseApi from './src/purchaseApi';

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
    this.express.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      // Pass to next layer of middleware
      next();
    });
  }

  // Configure API rest.
  private routes(): void {
    this.express.use(
        '/purchase', Router()
            .get('/', (req, res, next) => purchaseApi.getAll(req, res, next))
            .post('/', (req, res, next) => purchaseApi.post(req, res, next))
    );
    this.express.use(
        '/pay', Router()
            .get('/', (req, res, next) => PayApi.getAll(req, res, next))
            .post('/', (req, res, next) => PayApi.post(req, res, next))
    );
  }


}
export default new Web().express;
