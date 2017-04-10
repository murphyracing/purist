import {RestDataSource} from '../RestDataSource';
import {IPayment} from './domain/IPayment';
import {Observable} from 'rxjs/Observable';

export class PaymentDataSource {
  constructor (private ds: RestDataSource) {}

  all(): Observable<IPayment[]> {
    return this.ds.getAll('payments');
  }
}
