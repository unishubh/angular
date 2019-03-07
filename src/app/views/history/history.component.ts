import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }
  private _url = "http://localhost:3000/api/vendors";
  private _url_hist = "http://localhost:3000/api/history";
  public showTable: boolean;
  public token: String;
  public vendors: any[];
  public showForm: boolean;
  public details: any[];
  public isAdmin: boolean
  public level: Number;
  ngOnInit() {
    this.isAdmin = false;
    this.level = +localStorage.getItem('level');
    if (this.level == 0) {
      this.isAdmin = true;
    }
    this.showTable = false;
    this.showForm = true;
    this.token = localStorage.getItem('token');
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post(this._url, { headers: headers })
      .subscribe(
        (response: Response) => {

          let resp = response.json();
          console.log(resp);
          this.vendors = resp.details;


        },
        (error) => {
          console.log(error);
          alert("Some error occured");
        }
      );

  }

  onSubmit(values) {
    console.log(values);
    this.showTable = true;
    this.showForm = false;
    var headers = new Headers();
    let contents = new URLSearchParams();
    contents.set('vendor_id', values.vendor);
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post(this._url_hist, contents.toString(), { headers: headers }).
      subscribe(
        (response: Response) => {
          console.log("in api");
          let resp = response.json();
          this.details = resp.details;
          console.log(resp);
        },
        (error) => {
          console.log(error);
          alert("Cannot fetch history at this moment");
        }
      );


  }

  showAdmin() {
    if(this.isAdmin && this.showTable) {
      return true;

    }
    else {
      return false;
    }
  }
  showDetails() {
    this.router.navigate(['starter/vendorDetails/'+this.details[0].identifier]);
  }

}
