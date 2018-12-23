import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class CheckGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
       console.log("can activate");
        // if (true) {
        //     //this.router.navigate(['/starter']);
        //     return false;
        // }
        return true;
    }
 }