import { ProductService } from './../../services/product.service';
import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories!: ProductCategory[];

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {

    this.listProductCategories();
  }
  listProductCategories() {
    this.productSvc.getProductCategories().subscribe(
      (data:any) => {
        console.log('Product categories ' + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

}
