import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router) {
    
   }

  ngOnInit() {

  }

  private emailError = false;
  private passWordError = false;
  private dis = false;


  onSubmit(value: any) {
    console.log(value);
  }
}
