import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';
import {PaymentDataSource} from './PaymentDataSource';
import {RestDataSource} from '../RestDataSource';

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
export class PayTableComponent {
  columns: IColumn[] = [
    {field: 'type', header: 'Type'},
    {field: 'payTo', header: 'Pay To'},
    {field: 'invoice', header: 'Invoice #'},
    {field: 'amount', header: 'Amount Due'}
  ];
  payments: IPayment[];
  msgs: Message[];

  error: IError = { msg: '', innerMsg: '', show: false };

  constructor (private http: Http,
               private ds: PaymentDataSource) {
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

  onFieldChanged(payment, field) {
    console.log(payment, field);
  }

  saveColumnOrder(event) {
    const newOrder = event.columns.map(col => col.field);
    this.columns.sort((a, b) => newOrder.indexOf(a.field) - newOrder.indexOf(b.field));
    localStorage.columns = JSON.stringify(this.columns);
  }
}
