import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';

import { ShipListComponent } from './shiplist/shiplist.component';
import { PayListComponent } from './payments/PaymentsComponent';
import {PaymentFormComponent} from './payments/payment-form.component';
import {DataTableModule} from 'angular2-datatable';
import {PayTableComponent} from './payments/PayTableComponent';
import {DataFilterPipe} from "./DataFilterPipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
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
