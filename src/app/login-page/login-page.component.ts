import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

import {Credentials} from "../model/credentials";
import {AuthService} from "../service/auth.service";
import {INDEX} from "../index/index.component";

export const LOGIN_URL = 'login'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  credentials: Credentials = new Credentials("", "")

  isError: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.authenticate(this.credentials)
      .subscribe(authResult => {
        this.isError = false;
        if (authResult.redirectUrl) {
          this.router.navigateByUrl(authResult.redirectUrl);
        } else {
          this.router.navigateByUrl('/' + INDEX);
        }
      }, error => {
        this.isError = true;
        console.log(`Authentication error ${error}`);
      })
  }
}
