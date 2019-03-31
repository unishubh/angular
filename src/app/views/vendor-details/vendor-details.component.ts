import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {fields} from './../../form_data/declinedReasons';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http, private router: Router) { }
  private _url = "http://localhost:3000/api/vendorDetails";
  public vendors: any[] = [];
  public sales: any[] = [];
  public promoters: any[] = [];
  public manufacturers: any[] = [];
  public file: any[] =[];
  public id: String;
  public token: String;
  public level: Number;
  public isAdmin: boolean;
  public display: String;
  public fields :any[] = fields;
  public isDisplay:boolean = false;
  public isDecline : boolean = false;
  public confirm : boolean = false;
  public display2 : String;
  public data : boolean = true;
  public text: String ;
  public display3 : String;
  public display4: String;
  public message : String;
  public declineReason : String;
  public reportSubmitted : Boolean = false;
  public branches: any[] = [];
  public declarations: any[] = [];
  public fd = new FormData();
  ngOnInit() {
    this.isDisplay = false;
    this.display = 'none';
    this.display2 = 'none';
    this.display3 = 'none';
    this.display4 = 'none';
    this.isAdmin = false;
    this.level = +localStorage.getItem('level');
    if (this.level == 0)
      this.isAdmin = true;
    this.token = localStorage.getItem('token');
    this.route.params.subscribe(
      params => {
        console.log(params["id"]);
        this.id = params["id"];
        let url = this._url + "/" + params["id"];
        let activity_url = "http://localhost:3000/api/lastAction";
        let verificationUrl = "http://localhost:3000/api/verificationMessage"
        console.log(url);
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.get(activity_url+"/"+params['id'], { headers: headers })
        .subscribe(
          (response: Response) => {
            console.log(response.json());
            let resp = response.json();
            console.log(resp.activity);
            let lastAction = resp.activity;
            if(lastAction == "declined")
            {
              this.isDecline = true;
             // this.data = true;
            }

          }
        ); 
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.post(verificationUrl+"/"+params['id'], { headers: headers })
        .subscribe(
          (response: Response) => {
            console.log(response.json());
            let resp = response.json();
            console.log(resp.message);
            let lastAction = resp.message;
            if(lastAction != "No message")
            {
              this.display3 = "block";
              this.message = lastAction;
             // this.data = true;
            }

          }
        ); 

        this.http.get(url, { headers: headers })
          .subscribe(
            (response: Response) => {
              console.log(response.json());
              let resp = response.json();
              console.log(resp.data);
              this.vendors = resp.data;
              this.sales = resp.salesData;
              this.manufacturers = resp.manufacturersData;
              this.promoters = resp.promotersData;
              this.file = resp.files;
              this.branches = resp.branchData;
              //this.declarations = resp.declarations;


            }
          );
        
      }
    );
  }

  verify() {
    if(this.level == 4 && this.reportSubmitted == false) {
      alert("Please submit the report first");
      return;
    } 
    console.log("verifyi");
    var headers = new Headers();
    let content = new URLSearchParams();
    content.set('id', String(this.id));
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post("http://localhost:3000/api/verifyVendor/", content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          let resp = response.json();
          if (resp.message == "Vendor Verified") {
            alert("Vendor Verified");
            this.router.navigate(['/starter/vendorList']);
          }
        }
      );
  }

  decline() {
    this.isDisplay = true;
    console.log(this.isDisplay);
    this.openModal();
    
  }

  isVerified() {
    console.log("asdfg");
    this.confirm = true;
    console.log(this.confirm);
    this.openModal2();
  }

  openModal2() {
    this.display2 = "block"
  }

  openModal3() {
    this.display3 = "block";
  }

  openModal4() {
    this.display3 = "block";
  }

  showButton() {
    if (this.level == 0) {
      return false;
    }
    else return true;
  }

  showReportSubmission() {
    if(this.level == 4 && this.reportSubmitted == false) {
      return true;
    }
    else {
      return false;
    }
  }

  edit() {
    this.router.navigate(['/form/'+this.id+"/1"]);
  }

  openModal() {
    this.display= "block" ;
  }
  onCloseHandled() {
    this.display = "none";
    this.display2 = "none";
    this.display3 = "none";
    this.display4 = "none";
  }

  get selectedOptions() { // right now: ['1','3']
    console.log(this.fields);
    return this.fields
              .filter(opt => opt.checked)
              .map(opt => opt.name)
  }

  submit() {
    let details = this.selectedOptions ;
    let fields = "";
    let message = this.declineReason;
    details.forEach(detail => {
      fields = detail + "," +fields ;
    });
    console.log(details);
    console.log(fields);
    message = message+ " Please see these fields "+fields;
    console.log(message);
    let content = new URLSearchParams();
    content.set('id', String(this.id));
    content.set('details', JSON.stringify(details));
    content.set('message', String(message));
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post("http://localhost:3000/api/declineVendor/", content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          let resp = response.json();
          console.log(resp);
          if (resp.message == "Vendor Declined") {
            alert("Vendor Declined");
            this.display3 = "none";
            this.router.navigate(['/starter/vendorList']);
          }
        }
      );

  }

  submitVerification() {
    console.log(this.id);
    let content = new URLSearchParams();
    content.set('vendor_id', String(this.id));
    content.set('message', String(this.text));
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post("http://localhost:3000/api/forceVerify/", content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          let resp = response.json();
          console.log(resp);
          if (resp.message == "Vendor Verified") {
            alert("Vendor Verified");
            this.display2 = "none";
            this.router.navigate(['/starter/vendorList']);
          }
        }
      );
  }

  onFileChange(event) {
    let report = <File>event.target.files[0];
    let ex = report.name.indexOf('.');
    let extension = report.name.substring(ex);
    this.fd.append('report', report, this.id+'report'+extension);
  }

  upload() {
    //let fd = new FormData();
   
    
    //fd.append("identifier",String(this.id));
    const headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // headers.append('Accept', 'application/json');
    //console.log(fd);
    this.http.post("http://localhost:3000/api/uploadeReport", this.fd)
    .subscribe(res => {
      console.log(res);
      this.reportSubmitted = true;
    });
  }

  serve(file) {
    window.open("assets/img/"+this.id+file+".png","_blank");
  }

  showReport() {
    if(this.level < 4) {
      return true;
    }
    else {
      return false;
    }
  }

  report() {
    window.open("assets/img/"+this.id+".png","_blank");
  }


}
