import { ProductCategory } from './../common/product-category';
import { environment } from './../../environments/environment';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseApi = environment.baseApi;



  constructor(private httpClient: HttpClient) { }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseApi + "products"}/search/findByNameContainingIgnoreCase?name=${theKeyword}`;
    return this.getProduct(searchUrl);
  }

  private getProduct(searchUrl: string):
    Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }


  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseApi + "products"}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProduct(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.baseApi + "product-category")
      .pipe(map(response => response._embedded.productCategory)
      );
  }


}

interface GetResponseProducts { _embedded: { products: Product[]; } }

interface GetResponseProductCategory { _embedded: { productCategory: ProductCategory[]; } }
