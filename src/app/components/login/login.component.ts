import { OktaAuthStateService } from '@okta/okta-angular';

import { OKTA_AUTH } from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from '../../config/my-app-config';

import { Component, Inject, OnInit } from '@angular/core';

import  OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(private oktaAuthSvc: OktaAuthStateService,@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo:'assets/image/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.cliendId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams:{
        pkce:true,
        issuer:myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
     });
  }

  ngOnInit(): void {

    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
      el:'#okta-sign-in-widget'},  // this nam should be same as div tag id in loginComponent
      (response:any)=>{
        if(response.status==="SUCCESS"){
          this.oktaAuth.signInWithRedirect();
        }
      },
       (error:any)=>{
         throw error;
       }

      )
  }

}
