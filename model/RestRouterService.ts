import * as express from 'express';
import {Router} from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { PaymentsApi } from './src/PaymentsApi';
import { MessageRouter } from "./src/MessageRouter";

// Creates and configures an ExpressJS web server.
export class RestRouterService {
  // ref to Express instance
  public express: express.Application;

  private payApi: PaymentsApi;

  //Run configuration methods on the Express instance.
  constructor(private msgRouter: MessageRouter, port: number) {
    this.payApi = new PaymentsApi(msgRouter);
    this.express = express();
    this.express.set('port', port);
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(cookieParser());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.91:4200');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
        '/payments', Router()
            .get('/', (req, res, next) => this.payApi.getAll(req, res, next))
            .post('/', (req, res, next) => this.payApi.post(req, res, next))
            .put('/:id', (req, res, next) => this.payApi.updateOne(req, res, next))
    );
  }


};
