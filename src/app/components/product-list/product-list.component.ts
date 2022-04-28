import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryID!: number;
  searchMode!: boolean;

  constructor
    (
      private productSvc: ProductService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
    
  }
  handleSearchProducts(){
  const theKeyword: string = <string>this.route.snapshot.paramMap.get('keyword');
  // now search for the products using keyword
  this.productSvc.searchProducts(theKeyword).subscribe(
    data=>{
      this.products=data;
    }
  )
  }
  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryID = +<string>this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryID = 1;
    }

    this.productSvc.getProductList(this.currentCategoryID).subscribe(data => {
      this.products = data;
    })
  }
}
