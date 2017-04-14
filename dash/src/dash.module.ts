import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';

import {PayTableComponent} from './payments/PayTableComponent';
import {DataFilterPipe} from './DataFilterPipe';
import {
  DataTableModule, DialogModule, GrowlModule, OverlayPanelModule,
  SharedModule, TooltipModule
} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    // PrimeNG controls
    SharedModule,
    DataTableModule,
    GrowlModule,
    DialogModule,
    TooltipModule
  ],
  declarations: [
    PayTableComponent,
    DataFilterPipe,
  ],
  bootstrap: [ PayTableComponent ]
})
export class DashModule { }
