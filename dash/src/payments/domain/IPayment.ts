export interface IPayment {
  id: number;

  vendorId: number;
  vendor: string;

  customerId: number;
  customer: string;

  invoiceId: number;
  invoice: string;

  amount: string;
  approvedOn: Date;
}
