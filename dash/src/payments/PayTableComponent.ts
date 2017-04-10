import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DataTable, Message} from 'primeng/primeng';
import {Http} from '@angular/http';
import {IPayment} from './domain/IPayment';

export interface IColumn {
  field: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-pay-table',
  templateUrl: 'PayTableComponent.html',
  styleUrls: ['PayTableComponent.css'],
})
export class PayTableComponent implements OnInit {
  columns: IColumn[] = [
    {field: 'vendor'},
    {field: 'customer'},
    {field: 'invoice'}
  ];
  payments: IPayment[];
  msgs: Message[];

  constructor (private http: Http) {
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
  }

  ngOnInit() {
    this.http.get('assets/data.json')
      .subscribe((data) => {
        setTimeout(() => {
            this.payments = <IPayment[]> data.json();
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'Payments', 'detail': 'Data Ready'});
          },
        1000);
    });
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
