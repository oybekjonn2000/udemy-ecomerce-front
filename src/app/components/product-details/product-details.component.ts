import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  constructor(private productSvc: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    //get the "id" param string . convert to a number using + sybmol
     const theProductId: number =+<any> this.route.snapshot.paramMap.get('id');
      this.productSvc.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
