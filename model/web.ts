import * as path from 'path';
import * as express from 'express';
import {Router} from "express";
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import ApiV1 from './api/v1/api';

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

  // Configure API endpoints.
  private routes(): void {
    this.express.use(
        '/api/v1', Router()
                    .post('/', (req, res, next) => ApiV1.post(req, res, next))
    );
  }


}
export default new Web().express;
