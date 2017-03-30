import { Component, Input } from '@angular/core';
import { PuristData } from '../puristdata';


@Component({
  selector: 'app-pay-list',
  templateUrl: 'paylist.component.html',
  styleUrls: ['paylist.component.css'],
  providers: [PuristData]
})
export class PayListComponent {
  private servicePath = 'pay';
  private payList: Array<Object>;
  private errorMessage: string;


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
