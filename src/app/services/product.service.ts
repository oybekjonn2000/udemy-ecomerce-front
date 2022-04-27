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

  getProductList(theCategoryId: number): Observable<Product[]>{


    const searchUrl = `${this.baseApi+"products"}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
    .pipe(map(response=> response._embedded.products)
    );
  }
}
interface GetResponse
{
  _embedded:{
    products: Product[];
  }
}
