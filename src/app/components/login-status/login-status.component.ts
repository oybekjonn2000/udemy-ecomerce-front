import { OktaAuthStateService } from '@okta/okta-angular';

import { OKTA_AUTH } from '@okta/okta-angular';



import { OktaAuth } from '@okta/okta-auth-js';

import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName!: string;
  username: string;


  constructor(private oktaAuthSvc: OktaAuthStateService,@Inject(OKTA_AUTH)
              private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
   
    // subscribe
    this.oktaAuthSvc.authState$.subscribe(
      (result:any)=>{

        this.isAuthenticated= result;
        this.getUserDetails();

    });
  }


  getUserDetails() {
    if(this.isAuthenticated){
      //fetch the logged in user deatils (user's claims)

      // user fll nam is exposed as a property name
      this.oktaAuth.getUser().then(
        (res:any)=>{
          this.userFullName=res.name;
        }
      );
    }
  }


  logOut(){
    // terminates the session with okta and removes current tokens
    this.oktaAuth.signOut();
  }




}
