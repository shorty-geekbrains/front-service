import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {INDEX} from "../index/index.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isIndex: boolean = false;

  constructor(private router: Router,
              public auth: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isIndex = event.url === '/' || event.url === '/' + INDEX;
      }
    })
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/");
  }
}
