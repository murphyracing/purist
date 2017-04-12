import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';
import {PaymentDataSource} from './PaymentDataSource';
import {RestDataSource} from '../RestDataSource';
import {Subscription} from 'rxjs/Subscription';
import {TooltipService} from 'tooltip/TooltipService';


interface IColumn {
  field: string;
  header: string;
  error: string;
}

interface IError {
  msg: string;
  innerMsg: string;
  show: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'mrp-pay-table',
  templateUrl: 'PayTableComponent.html',
  styleUrls: ['PayTableComponent.css'],
  providers: [RestDataSource, PaymentDataSource, TooltipService]
})
export class PayTableComponent implements OnDestroy {
  columns: IColumn[] = [
    {field: 'type', header: 'Type', error: ''},
    {field: 'payTo', header: 'Pay To', error: ''},
    {field: 'invoice', header: 'Invoice #', error: ''},
    {field: 'amount', header: 'Amount Due', error: ''}
  ];
  payments: IPayment[];
  msgs: Message[];

  srvMsgStream: Subscription;

  error: IError = { msg: '', innerMsg: '', show: false };
  fieldError: any;

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

  onFieldChanged(payment, col) {
    this.ds
      .update(payment.id, [{ field: col.field, value: payment[col.field] }])
      .subscribe(
        result => console.log(result),
        error => {
          console.error(error);
          col.error = error;
        }
      );
  }

  saveColumnOrder(event) {
    const newOrder = event.columns.map(col => col.field);
    this.columns.sort((a, b) => newOrder.indexOf(a.field) - newOrder.indexOf(b.field));
    localStorage.columns = JSON.stringify(this.columns);
  }
}
