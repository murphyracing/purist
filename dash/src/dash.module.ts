import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';

import { PayListComponent } from './payments/PaymentsComponent';
import {PaymentFormComponent} from './payments/payment-form.component';
import {PayTableComponent} from './payments/PayTableComponent';
import {DataFilterPipe} from './DataFilterPipe';
import {DataTableModule, GrowlModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    OverlayPanelModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    /*ShipListComponent,*/
    PayListComponent,
    PaymentFormComponent,
    PayTableComponent,
    DataFilterPipe
  ],
  bootstrap: [ /*ShipListComponent,*/ PayListComponent ]
})
export class DashModule { }
