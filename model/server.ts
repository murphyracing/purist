import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";

import { RestRouterService } from './RestRouterService';

class Server {
  public static readonly PORT = 3000;
  private port: number;
  private server: any;
  private io: any;
  public rest: RestRouterService;

  constructor() {
    this.port = process.env.PORT || Server.PORT;
    this.rest = new RestRouterService(this.port);

    this.server = http.createServer(this.rest.express);
    this.io = socketIO(this.server);
    this.io.set('origins', 'http://192.168.2.91:4200');
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      let i = 0;
      setInterval(() => this.io.emit('message', ++i), 1000);
      socket.on('message', (m) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}

let server = new Server();
server.listen();
