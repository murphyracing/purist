import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { PuristData } from '../RestDataSource';


@Component({
  selector: 'app-pay-list',
  templateUrl: 'PaymentsComponent.html',
  styleUrls: ['PaymentsComponent.css'],
  providers: [PuristData]
})
export class PayListComponent {
  private servicePath = 'pay';
  private payList: Array<Object>;
  private errorMessage: string;
  private filterQuery: string;


  constructor (private data: PuristData) {
    this.fetchData();
  }

  fetchData() {
    this.payList = [];
    this.data.getAll(this.servicePath).subscribe(
      result => {
        for (let i = 0; i < result.length; ++i) {
          console.log(result[i]);
          this.payList.push(result[i]);
        }
      },
      error => { console.error(error); this.errorMessage = error; }
    );
  }
}
