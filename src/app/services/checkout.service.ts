import { Observable } from 'rxjs';
import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseApi = environment.baseApi;
  private purchaseUrl=`${this.baseApi+"checkout/purchase"}`;


  constructor(private http: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
      return this.http.post<Purchase>(this.purchaseUrl, purchase);
  }

  
}
