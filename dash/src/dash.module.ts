import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';

import { ShipListComponent }  from './shiplist/shiplist.component';
import { PayListComponent }  from './paylist/paylist.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ShipListComponent,
    PayListComponent
  ],
  bootstrap: [ ShipListComponent, PayListComponent ]
})
export class DashModule { }
