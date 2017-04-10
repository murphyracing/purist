export interface IPayment {
  id: number;
  type: string;
  payTo: string;
  vendor: string;
  customer: string;
  invoice: string;
  amount: string;
  approvedOn: Date;
}
