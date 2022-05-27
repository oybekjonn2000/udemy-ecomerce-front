import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  baseApi = environment.baseApi;
  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next))
  }
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // only add an accsess token for secured endpoints
    const securedEndpoints = [this.baseApi+'orders'];

    if(securedEndpoints.some(url=> request.urlWithParams.includes(url))){

      //get access token
      const accsessToken = await this.oktaAuth.getAccessToken();

      //clone the rquest add new headrer with access token

      request = request.clone({
        setHeaders:{
          Authorization: 'Bearer'+ accsessToken
        }
      });


    }

    return next.handle(request).toPromise();
  }
}
