import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {Http, Headers, Response} from '@angular/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  constructor(private fb: FormBuilder, private router: Router, private http: Http) { }
  userForm : FormGroup;
  ngOnInit() {
    this.userForm = this.fb.group({
      username :[],
      password: [],
      email: [],
      phone :[],
      company: [],
      department: [],
      role: [],
      level: []
    });
  }

  private _url = 'http://localhost:3000/api/register';


  onSubmit() {
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization',`Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    let content = new URLSearchParams();
    content.set('username',this.userForm.value.username);
    content.set('password',this.userForm.value.password);
    content.set('email',this.userForm.value.email);
    content.set('phone',this.userForm.value.phone);
    content.set('company',this.userForm.value.company);
    content.set('department',this.userForm.value.department);
    content.set('role',this.userForm.value.role);
    content.set('level',this.userForm.value.level);

    this.http.post(this._url, content.toString(), {headers})
     .subscribe(
       (response:Response) => {
         console.log(response);
         if(response.status == 200)
         {
           alert("User added Successfully");
         }
       }
     )

  }
}
