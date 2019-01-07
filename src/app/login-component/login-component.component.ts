import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm } from '@angular/forms';
import {Http, Headers, Response} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {LoginService} from './../services/login.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router, private http: Http) {
    
   }

  ngOnInit() {

  }
  private token;
  private nameError = false;
  private passWordError = false;
  private dis = false;
  private _url = 'http://localhost:3000/api/login';

  onSubmit(value: any) {
    //console.log(value.username);
    if (value.username == null || value.username == '') {
      this.nameError = true;
    } 
    else {
      this.nameError = false;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('username', value.username);
      content.set('password',value.password);

      this.http.post(this._url,content.toString(), {headers:headers})
          .subscribe(
            (response: Response) => {
            let response_p = response.json();
            let token = response_p.token;
            console.log(response_p)
            if(token) {
              localStorage.setItem('token',token);
              localStorage.setItem('username',response_p.username);
              localStorage.setItem('level',response_p.level);
             this.router.navigate(['/starter']);
            }

            console.log(token);
            },
            (error) => {
              alert('Wrong Username or Password');
              
              console.log(error);
            }
            )
          



    }
    //console.log(value);
    // this.loginservice.login(value.name,value.password)
    //   .subscribe(result=>{
    //     console.log(result);
    //   })
  }
}
