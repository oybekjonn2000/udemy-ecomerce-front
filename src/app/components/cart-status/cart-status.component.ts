import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartSvc.totalPrice.subscribe(data=>{
      this.totalPrice =data;
    });


    //subscribe o the cart quantity
    this.cartSvc.totalQuantity.subscribe(data=>{
      this.totalQuantity =data;
    });

  }


}
