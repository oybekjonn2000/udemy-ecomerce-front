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
   baseApi = environment.baseApi;
  constructor(private httpClient: HttpClient) { }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseApi + "products"}/search/findByNameContainingIgnoreCase?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

      const searchUrl = `${this.baseApi + "products"}/search/findByNameContainingIgnoreCase?name=${theKeyword}`
                      +`&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
}


  private getProducts(searchUrl: string):
    Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }


  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {
                            /**+
                            * page and size
                            */
    const searchUrl = `${this.baseApi + "products"}/search/findByCategoryId?id=${theCategoryId}`
                                      +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseApi + "products"}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.baseApi + "product-category")
      .pipe(map(response => response._embedded.productCategory)
      );
  }

  getProduct(theProductId: number): Observable<Product>{
      // need t obuild URl baased on product ID
      const productUrl = `${this.baseApi+"products"}/${theProductId}`;
      return this.httpClient.get<Product>(productUrl);
  }


}

interface GetResponseProducts {
  _embedded: { products: Product[];
  },
  page: {
    size: number,
    totalElemets: number,
    totalPages:number,
    number: number

  }
}

interface GetResponseProductCategory { _embedded: { productCategory: ProductCategory[]; } }
