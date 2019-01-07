import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router} from '@angular/router';

@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {

  constructor(private router: Router) { }
  public username : String;
  public level :Number;
  public isLevel3: Boolean;
  public isAdmin :Boolean;
  ngOnInit() {
    this.isAdmin = false;
    this.isLevel3 = false;
    let username = localStorage.getItem('username');
    let level = localStorage.getItem('level');
    this.level = +level;
    if(this.level == 3) {
      this.isLevel3 = true;
    }
    else if(this.level == 0) {
      this.isAdmin = true;
    }
    console.log(username);
    this.username = username;
  }

  logout() {
    console.log("logout clicked");
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

}
