import {RestDataSource} from '../RestDataSource';
import {IPayment} from './domain/IPayment';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as socketIO from 'socket.io-client';

@Injectable()
export class PaymentDataSource {
  constructor (private ds: RestDataSource) {}

  all(): Observable<IPayment[]> {
    return this.ds.getAll('payments');
  }

  serverMessages(): Observable<any> {
    const socket = socketIO('http://192.168.2.91:3000');
    return new Observable(observer => {
      socket.on('message', data => observer.next(data));
      return () => socket.disconnect();
    });
  }
}
