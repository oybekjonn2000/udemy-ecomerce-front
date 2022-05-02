import { CartService } from './../../services/cart.service';
import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryID: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword!: string;

  constructor
    (
      private productSvc: ProductService,
      private route: ActivatedRoute,
      private cartSvc: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
    const theKeyword: string = <string>this.route.snapshot.paramMap.get('keyword');


    // if we a different keyword than previous

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword}, thepagenumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productSvc.searchProductsPaginate(this.thePageNumber-1,
                                            this.thePageSize,
                                            theKeyword).subscribe(this.processResult());
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

    //check if we have a different category than previous
    //Note: aangular will reuse a component if it is currently being viewed
    //if we have different category id than previous
    //then se thePageNumber back to 1;

    if (this.previousCategoryId != this.currentCategoryID) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryID;

    console.log(`currentcategoryID=${this.currentCategoryID}, thePageNumber=${this.thePageNumber}`);


    this.productSvc.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryID)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pagesize: number) {
    this.thePageSize = pagesize;
    this.thePageNumber = 1;
    this.listProducts();

  }

  addToCart(theProduct: Product){

    console.log(`add to cart : ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem  =new CartItem(theProduct);
    this.cartSvc.addToCart(theCartItem);


  }
}
