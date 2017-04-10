import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';
import {PaymentDataSource} from './PaymentDataSource';

interface IColumn {
  field: string;
}

interface IError {
  msg: string;
  show: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'app-pay-table',
  templateUrl: 'PayTableComponent.html',
  styleUrls: ['PayTableComponent.css'],
})
export class PayTableComponent {
  columns: IColumn[] = [
    {field: 'vendor'},
    {field: 'customer'},
    {field: 'invoice'}
  ];
  payments: IPayment[];
  msgs: Message[];

  error: IError = { msg: '', show: false };

  constructor (private http: Http,
               private ds: PaymentDataSource) {
    if (localStorage.columns) {
      try {
        const colSettings = JSON.parse(localStorage.columns);
        if (colSettings) {
          console.log(colSettings);
          this.columns = colSettings;
        }
      } catch (SyntaxError) {
        localStorage.columns = '';
      }
    }
    ds.all().subscribe(
      result => {

      },
      error => {
        this.error.msg = `
        I can't seem to find any payment data to show you.
        <br>
        When I looked in the usual place, I found this error instead:
        <br>
        <pre>${error}</pre>
        `
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
