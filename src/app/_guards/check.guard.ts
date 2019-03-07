import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class CheckGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
       console.log("can activate");
        if (localStorage.getItem('token')) {
            this.router.navigate(['/starter/vendorList']);
            return false;
        }
        return true;
    }
 }