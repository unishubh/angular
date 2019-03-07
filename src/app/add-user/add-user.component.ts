import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { companies, departments } from '../form_data/addUser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  constructor(private fb: FormBuilder, private router: Router, private http: Http) { }
  userForm: FormGroup;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public onlyNums = "^[0-9]*$";
  public onlyAlpha = "^[A-Za-z_]+$";
  public dis = true;
  public companies = companies;
  public departments = departments;
  public level = 0;

  ngOnInit() {

    this.userForm = this.fb.group({
      username: ['', Validators.compose([Validators.pattern(this.onlyAlpha)])],
      password: ['', Validators.compose([Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.pattern(this.emailPattern)])],
      phone: ['', Validators.compose([Validators.pattern(this.onlyNums), Validators.minLength(10)])],
      company: ['',],
      department: [0],
      role: ['',],
      level: ['',]
    });
  }

  private _url = 'http://localhost:3000/api/register';

  showDep() {
    if(this.level < 5) {
      return false;
    }
    else {

      return true;
    }

  }
  onSubmit() {
    if (this.userForm.invalid) {
      console.log("Invalid email");

      return;
    }
    else {
      this.dis = false;
    }
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    let content = new URLSearchParams();
    content.set('username', this.userForm.value.username);
    content.set('password', this.userForm.value.password);
    content.set('email', this.userForm.value.email);
    content.set('phone', this.userForm.value.phone);
    content.set('company', this.userForm.value.company);
    content.set('department', this.userForm.value.department);
    content.set('role', this.userForm.value.role);
    content.set('level', this.userForm.value.level);

    this.http.post(this._url, content.toString(), { headers })
      .subscribe(
        (response: Response) => {
          console.log(response);
          if (response.status == 200) {

            alert("User added Successfully");
            this.router.navigate(['starter/userList']);
          }
        }
      )

  }
}
