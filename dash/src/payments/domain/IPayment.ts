export interface IPayment {
  type: string;
  payTo: string;
  vendor: string;
  customer: string;
  invoice: string;
  amount: string;
  approvedOn: Date;
}
