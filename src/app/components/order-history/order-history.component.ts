import { OrderHistoryService } from './../../services/order-history.service';
import { OrderHistory } from './../../common/order-history';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;


  constructor(private orderHistorySvc: OrderHistoryService) { }

  ngOnInit(): void {

    this.handleOrderHistory();
  }


  handleOrderHistory() {
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    // retrieve data from the service

    this.orderHistorySvc.getOrderHistory(theEmail).subscribe(data=>{
      this.orderHistoryList = data._embedded.orders;
    })
  }

}
