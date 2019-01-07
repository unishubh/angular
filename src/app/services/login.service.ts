import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
  public token: string;
  public username: string;
  public api_url: string;

  constructor(private http: Http, private router: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.api_url = "localhost:3000/";
   }

   login(username:string, password:string): Observable<boolean> {
     console.log("service called");
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     let content = new URLSearchParams();
     content.set('username', username);
     content.set('password',password);
     return this.http.post(this.api_url+'api/login', content.toString() , {
      headers: headers
  })
       .map((response: Response) => {
         let token = response.json() && response.json().token;
         if(token) {
          localStorage.setItem('token', token);
         return true;
         }
         else {
           return false;
         }
         
       }).catch(error=> {console.log("err");return [false];})
   }

}
