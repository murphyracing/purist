import {Component, Input} from '@angular/core';
import {ShipListData} from './ShipListData';

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

  constructor (private shipData: ShipListData) {}


  postItem(event) {
    event.preventDefault();
    this.shipData.postItem(this.itemTitle, this.itemIsComplete).subscribe(
        result => this.itemTitle = JSON.stringify(result),
        error => { console.error(error); this.itemTitle = error; }
    );
  }
}
