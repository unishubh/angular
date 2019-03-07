import { Component, OnInit } from '@angular/core';
import { Vendors } from '../services/models/vedndors';
import { Http, Headers, Response } from '@angular/http';
@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  constructor(private http: Http) { }
  private _url = "http://localhost:3000/api/showVendors";
  private level : number;
  public vendors :any[] = [];

  ngOnInit() {

    this.level = +localStorage.getItem('level');
    let token = localStorage.getItem('token');
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    let content = new URLSearchParams();
    content.set('level', String(this.level));
    this.http.post(this._url ,content.toString(), { headers: headers })
    .subscribe(
      (response : Response)=> {
        console.log(response.json());
        let resp = response.json();
        console.log(resp.details);
        this.vendors = resp.details;
        console.log(this.vendors);
        
      }
    );
  }

}
