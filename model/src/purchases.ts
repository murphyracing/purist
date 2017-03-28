export class Signal {
  public id: number;
  public type: SignalType;
  public date: Date;
  public subject: string;
  public qtyType: QtyType;
  public qty: number;
  public po: PoNum;
  public vendor: Vendor;
  public tracking: string;
}

export class Vendor {
  public id: number;
  public business_name: string;
  constructor(id: number) { this.id = id; }
}


export class SignalType {
  constructor(public id: number, public label: string) {}
}

export class QtyType {
  public id: number;
  public label: string;
  constructor(id: number) { this.id = id; }
}

export class PoNumGroup {
  public id: number;
  public label: string;
  constructor(id: number) { this.id = id; }
}

export class PoNum {
  public id: number;
  public group: PoNumGroup;
  public member: number;
  constructor(id: number) { this.id = id; }
}
