import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';
import {PaymentDataSource} from './PaymentDataSource';
import {RestDataSource} from '../RestDataSource';
import {Subscription} from 'rxjs/Subscription';


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
  selector: 'mrp-pay-table',
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
          p.fieldErrors = {};
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

  onFieldChanged(payment: IPayment, col: IColumn) {
    this.ds
      .update(payment.id, [{ field: col.field, value: payment[col.field] }])
      .subscribe(
        result => {
          console.log(result);
          if (payment.fieldErrors[col.field]) {
            payment.fieldErrors[col.field] = '';
          }
        },
        error => {
          console.error(error);
          payment.fieldErrors[col.field] = error;
        }
      );
  }

  saveColumnOrder(event) {
    const newOrder = event.columns.map(col => col.field);
    this.columns.sort((a, b) => newOrder.indexOf(a.field) - newOrder.indexOf(b.field));
    localStorage.columns = JSON.stringify(this.columns);
  }
}
