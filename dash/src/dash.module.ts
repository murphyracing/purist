import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';

import {PayTableComponent} from './payments/PayTableComponent';
import {DataFilterPipe} from './DataFilterPipe';
import {
  DataTableModule, DialogModule, GrowlModule, OverlayPanelModule,
  SharedModule
} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    DialogModule,
    OverlayPanelModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    PayTableComponent,
    DataFilterPipe
  ],
  bootstrap: [ PayTableComponent ]
})
export class DashModule { }
