import {Component, Input} from '@angular/core';
import {ShipListData} from './ShipListData';


class Row {
  constructor(public rowIndex: number, public label: string) {}
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
  providers: [ShipListData]
})
export class ShipListComponent {
  private itemTitle: string;
  private itemIsComplete: boolean;
  private shipList: Row[];
  private errorMessage: string;


  constructor (private shipData: ShipListData) {
    this.fetchData();
  }


  fetchData() {
    this.shipList = [];
    this.shipData.getAll().subscribe(
      result => {
        for (let i = 0; i < result.length; ++i) {
          this.shipList.push(new Row(i, result[i].subject));
        }
      },
      error => { console.error(error); this.errorMessage = error; }
    );
  }


  postItem(event) {
    event.preventDefault();
    this.shipData.postItem(this.itemTitle, this.itemIsComplete).subscribe(
        result => this.itemTitle = JSON.stringify(result),
        error => { console.error(error); this.itemTitle = error; }
    );
  }
}
