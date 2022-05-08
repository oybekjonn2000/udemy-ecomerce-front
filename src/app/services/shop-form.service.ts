import { State } from './../common/state';
import { Country } from './../common/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {
  baseApi = environment.baseApi;
  private countriesUrl = `${this.baseApi + "countries"}`
  private statesUrl = `${this.baseApi + "states"}`



  constructor(private http: HttpClient) { }


  getCountries(): Observable<Country[]> {
    return this.http.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries));
  }

  getStates(theCountryCode: string): Observable<State[]> {
     //search URL
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`
    return this.http.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states));
  }


  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    //build an array for "Month " dropdown list
    // - start at current month and loop until
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth)
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }











}

interface GetResponseCountries {
  _embedded: {
    countries: Country[]
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[]
  }
}
