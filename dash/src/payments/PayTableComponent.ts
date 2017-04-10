import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';
import {PaymentDataSource} from './PaymentDataSource';
import {RestDataSource} from '../RestDataSource';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';

interface IColumn {
  field: string;
  header: string;
}

interface IError {
  msg: string;
  innerMsg: string;
  show: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'app-pay-table',
  templateUrl: 'PayTableComponent.html',
  styleUrls: ['PayTableComponent.css'],
  providers: [RestDataSource, PaymentDataSource]
})
export class PayTableComponent implements OnDestroy {
  columns: IColumn[] = [
    {field: 'type', header: 'Type'},
    {field: 'payTo', header: 'Pay To'},
    {field: 'invoice', header: 'Invoice #'},
    {field: 'amount', header: 'Amount Due'}
  ];
  payments: IPayment[];
  msgs: Message[];

  srvMsgStream: Subscription;

  error: IError = { msg: '', innerMsg: '', show: false };

  constructor (private http: Http,
               private ds: PaymentDataSource) {
    this.srvMsgStream = ds.serverMessages().subscribe(msg => this.onServerMsg(msg));

    if (localStorage.columns) {
      try {
        const colSettings = JSON.parse(localStorage.columns);
        if (colSettings) {
          // this.columns = colSettings;
        }
      } catch (SyntaxError) {
        localStorage.columns = '';
      }
    }
    ds.all().subscribe(
      result => {
        this.payments = result.map(data => {
          const p: IPayment = data;
          p.type = p.vendor ? 'Bill' : 'Refund';
          p.payTo = p.vendor ? p.vendor : p.customer;
          return p;
        });
      },
      error => {
        this.error.msg = `
        I can't seem to find any payment data to show you.<br>
        When I looked in the usual place, I found this error instead:
        `;
        this.error.innerMsg = error;
        this.error.show = true;
      }
    );
  }

  ngOnDestroy() {
    this.srvMsgStream.unsubscribe();
  }

  onServerMsg(msg) {
    if (msg.method === 'update') {
      for (const payment of this.payments) {
        if (payment.id === +msg.id) {
          for (const update of msg.updates) {
            console.log('update', update.field, 'to', update.value);
            payment[update.field] = update.value;
          }
        }
      }
    } else {
      console.error('Unsupported server message: ', msg.method);
    }
  }

  onFieldChanged(payment, field) {
    this.ds.update(payment.id, [{ field: field, value: payment[field] }]).subscribe(
      result => null,
      error => console.error(error)
    );
  }

  saveColumnOrder(event) {
    const newOrder = event.columns.map(col => col.field);
    this.columns.sort((a, b) => newOrder.indexOf(a.field) - newOrder.indexOf(b.field));
    localStorage.columns = JSON.stringify(this.columns);
  }
}
