import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";

import { RestRouterService } from './RestRouterService';
import {MessageRouter} from "./src/MessageRouter";

class Server {
  public static readonly PORT = 3000;
  private port: number;
  private server: any;
  private io: any;
  public rest: RestRouterService;

  constructor(private msgRouter: MessageRouter) {
    this.port = process.env.PORT || Server.PORT;
    this.rest = new RestRouterService(msgRouter, this.port);

    this.server = http.createServer(this.rest.express);
    this.io = socketIO(this.server);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);

      this.msgRouter.addSink(msg => {
        this.io.emit('message', msg );
      });
    });

    this.io.on('connect', socket => {
      console.log('Connected client on port %s.', this.port);

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}

const msgRouter = new MessageRouter();

let server = new Server(msgRouter);
server.listen();
