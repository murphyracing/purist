import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { PuristData } from '../puristdata';
import {Http} from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-pay-table',
  templateUrl: 'PayTableComponent.html',
  styleUrls: ['PayTableComponent.css'],
})
export class PayTableComponent implements AfterViewInit {
  public columns: any[] = [
    {name: 'vendor', title: 'Vendor', width: '30%'},
    {name: 'customer', title: 'Customer', width: '40%'},
    {name: 'invoice', title: 'Invoice', width: '10%'},
    {name: 'city', title: 'City', width: '20%'}
  ];
  data;
  columnFilters = {};
  rowsOnPage = 10;
  sortBy = 'email';
  sortOrder = 'asc';
  tableWidget: any;

  constructor (private http: Http) {
  }

  onFilter(colName, filter) {
    const newFilters = {};
    for (const col of this.columns) {
      newFilters[col.name] = col.filter ? col.filter : '';
    }
    newFilters[colName] = filter;
    this.columnFilters = newFilters;
  }

  ngAfterViewInit() {
    const exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({select: true});

    this.http.get('assets/data.json')
      .subscribe((data) => {
        setTimeout(() => {
          this.data = data.json();
        }, 1000);
      });
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }
}
