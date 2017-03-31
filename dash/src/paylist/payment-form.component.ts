import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  template: `    
    <form novalidate [formGroup]="payment">
      <div class="row">
        <div class="col-sm-2">
          <div class="md-form">
            <input
              type="text"
              id="vendor"
              formControlName="vendor"
              class="form-control"
              (blur)="onSubmit()">
          </div>
        </div>
        <div class="col-sm-2">
          <div class="md-form">
            <input
              type="text"
              id="customer"
              formControlName="customer"
              class="form-control"
              (blur)="onSubmit()">
          </div>
        </div>
        <div class="col-sm-2">
          <div class="md-form">
            <input
              type="text"
              id="invoice"
              formControlName="invoice"
              class="form-control"
              (blur)="onSubmit()">
          </div>
        </div>
      </div>

      <!--<input formControlName="amount" id="amount" type="text">
      <label for="amount">amount</label>
      <input formControlName="approvedOn" id="approvedOn" type="text">
      <label for="approvedOn">approved on</label>-->
    </form>
  `
})
export class PaymentFormComponent implements OnInit {
  @Input() data: any;

  payment: FormGroup;

  constructor() {}

  ngOnInit() {
    this.payment = new FormGroup({
      vendor: new FormControl(this.data.vendor),
      customer: new FormControl(this.data.customer),
      invoice: new FormControl(this.data.invoice)
    });
  }

  onSubmit() {
    console.log(this.payment.value, this.payment.valid);
  }
}
