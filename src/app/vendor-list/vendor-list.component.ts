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
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.get(this._url + '/' + this.level, { headers: headers })
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
