import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http) { }
  private _url = "http://localhost:3000/api/vendorDetails";
  public vendors :any[] = [];
  public sales :any[] = [];
  public promoters :any[] = [];
  public manufacturers :any[] = [];
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params["id"]);
        let url = this._url+"/"+params["id"];
        console.log(url);
        var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.get(url, { headers: headers })
    .subscribe(
      (response : Response)=> {
        console.log(response.json());
        let resp = response.json();
        console.log(resp.details);
        this.vendors = resp.details;
        this.sales = resp.sales;
        this.manufacturers = resp.manufacturers;
        this.promoters = resp.promoters;
        
      }
    );
      }
      );
  }

}
