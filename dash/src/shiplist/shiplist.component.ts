import {Component, Input} from '@angular/core';
import {PuristData} from '../RestDataSource';


class Row {
  constructor(public rowIndex: number, public signal: any) {}
}


export class ShippedSale {
  saleNo: number;
  customer: string;
  lbs: number;
}

@Component({
  selector: 'app-ship-list',
  templateUrl: 'shiplist.component.html',
  styleUrls: ['shiplist.component.css'],
  providers: [PuristData]
})
export class ShipListComponent {
  private itemTitle: string;
  private itemIsComplete: boolean;
  private shipList: Row[];
  private errorMessage: string;


  constructor (private shipData: PuristData) {
    this.fetchData();
  }


  fetchData() {
    this.shipList = [];
    this.shipData.getAll('purchase').subscribe(
      result => {
        for (let i = 0; i < result.length; ++i) {
          console.log(result[i]);
          this.shipList.push(result[i]);
        }
      },
      error => { console.error(error); this.errorMessage = error; }
    );
  }


  postItem(event) {
    event.preventDefault();
    this.shipData.postItem('purchase', this.itemTitle, this.itemIsComplete).subscribe(
        result => this.itemTitle = JSON.stringify(result),
        error => { console.error(error); this.itemTitle = error; }
    );
  }
}
