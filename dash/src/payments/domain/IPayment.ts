export interface IPayment {
  vendor: string;
  customer: string;
  invoice: string;
  amount: string;
  approvedOn: Date;
}
