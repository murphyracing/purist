import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: 'payment-form.component.html',
  styleUrls: ['payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @Input() data: any;

  payment: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.payment = this.fb.group({
      'vendor': '',
      'customer': '',
      'invoice': ['', Validators.required]
    });
    this.resetForm();
  }

  onSubmit() {
    console.log(this.payment.value, this.payment.valid);
  }

  onKeyDown(control: string, keyCode: number) {
    if (keyCode === 27) {
      console.log(this.data);
      this.payment.controls[control].reset();
      this.payment.controls[control].setValue(this.data[control]);
    }
  }

  resetForm() {
    this.payment.reset();
    this.payment.patchValue(this.data);
  }
}
