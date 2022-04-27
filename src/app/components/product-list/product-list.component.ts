import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  constructor(private productSvc:ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productSvc.getProductList().subscribe(data=>{
      this.products =data;
    })
  }

}
