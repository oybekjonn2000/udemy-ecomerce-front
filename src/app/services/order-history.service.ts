import { OrderHistory } from './../common/order-history';
import { Order } from './../common/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  baseApi = environment.baseApi;

  constructor(private http: HttpClient) { }


  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    // need to build URL

    const orderHistoryUrl =
    `${this.baseApi}orders/search/findByCustomerEmail?email=${theEmail}`;

    return  this.http.get<GetResponseOrderHistory>(orderHistoryUrl);

  }
}


interface GetResponseOrderHistory{
  _embedded:{
    orders: OrderHistory[];
  }
}

