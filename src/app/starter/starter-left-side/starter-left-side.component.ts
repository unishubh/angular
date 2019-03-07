import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {

  constructor(private router: Router) { }
  public username: String;
  public level: Number;
  public isLevel6: Boolean;
  public isLevel5: Boolean;
  public isLevel4: Boolean;
  public isLevel3: Boolean;
  public isLevel2: Boolean;
  public isLevel1: Boolean;
  public isAdmin: Boolean;
  ngOnInit() {
    this.isAdmin = false;
    this.isLevel6 = false;
    this.isLevel5 = false;
    this.isLevel4 = false;
    this.isLevel3 = false;
    this.isLevel2 = false;
    this.isLevel1 = false;
    let username = localStorage.getItem('username');
    let level = localStorage.getItem('level');
    this.level = +level;
    if (this.level == 6) {
      this.isLevel6 = true;
    }
    else if (this.level == 5) {
      this.isLevel2 = true;
    }
    else if (this.level == 4) {
      this.isLevel2 = true;
    }
    else if (this.level == 3) {
      this.isLevel2 = true;
    }
    else if (this.level == 2) {
      this.isLevel2 = true;
    }
    else if (this.level == 1) {
      this.isLevel1 = true;
    }
    else if (this.level == 0) {
      this.isAdmin = true;
    }
    console.log(this.level);
    this.username = username;
  }

  logout() {
    console.log("logout clicked");
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }
  showReject() {
    if (this.level == 2 || this.level == 1) {
      return true;
    }
    else {
      return false;
    }
  }

  greaterThan1() {
    if (this.level > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  greaterThan2() {
    if (this.level > 2) {
      return true;
    }
    else {
      return false;
    }
  }

  greaterThan3() {
    if (this.level > 3) {
      return true;
    }
    else {
      return false;
    }
  }

  greaterThan4() {
    if (this.level > 4) {
      return true;
    }
    else {
      return false;
    }
  }

  greaterThan5() {
    if (this.level > 5) {
      return true;
    }
    else {
      return false;
    }
  }

}
