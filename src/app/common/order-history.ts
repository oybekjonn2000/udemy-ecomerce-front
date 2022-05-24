import { Order } from './order';
export class OrderHistory {
  id!: string;
  orderTrackingNumber!: string;
  totalPrice!: number;
  totalQuantity!: number;
  dateCreated!: Date;

  constructor(order: Order){
    this.totalQuantity= order.totalQuantity;
  }
}
