import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { CompanyContact, CompanyDetails, Declaration } from '../../../services/models/vedndors';
import { FormDataService } from '../../../services/form-data.service';
import { company_type, industry_type, vendor_type } from '../../../form_data/vendor_link'

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  public companyDetails: CompanyDetails;
  public declaration: Declaration;
  public industry_type: any[] = industry_type;
  public vendor_type: any[] = vendor_type;
  public company_type: any[] = company_type;
  public show = true;
  public identifier: string;
  public editable: number = 2;
  public fields: any[];
  private url = "http://13.234.109.247:3000/api/save";
  private _fields_url = "http://13.234.109.247:3000/api/declineFields";
  public isData = false;
  public isForm2 = false;
  fd = new FormData();
  constructor(private route: ActivatedRoute, private router: Router, private formDataService: FormDataService, private http: Http) { }

  ngOnInit() {
    console.log(this.company_type);

    this.route.params.subscribe(
      params => {
        console.log(params);
        let identifier = params["identifier"];
        this.editable = params["update"];
        this.identifier = identifier;
        console.log(identifier);
        let data = this.formDataService.fetchData(identifier)
          .subscribe(
            (data: any) => {
              let rsp = data.json();
              console.log(rsp.data.form_allocated);
              if (rsp.data.form_allocated == 2) {
                this.isForm2 = true;
                console.log(this.isForm2);
              }
              console.log(this.formDataService.flag);
              if (this.formDataService.flag == 0) {
                this.formDataService.initFormData(rsp.data);
              }
              this.formDataService.setStatus(rsp.data);
              if(rsp.data.is_submit == 1) {
                this.show = false;
              }
              console.log("getting data");
              this.companyDetails = this.formDataService.getCompanyDetails();
              this.declaration = this.formDataService.getDeclaration();
              console.log(this.declaration);
              this.isData = true;
            },
            (error) => {
              console.log("error aayi", error);
              console.log("no data");
              this.companyDetails = this.formDataService.getCompanyDetails();
              this.declaration = this.formDataService.getDeclaration();
              console.log(this.companyDetails);
              this.isData = true;
            }

          )

      }

    );
    if (this.editable == 1) {
      var headers = new Headers();
      let content = new URLSearchParams();
      content.set('vendor_id', String(this.identifier));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin', '*');
      console.log("getting fields");
      this.http.post(this._fields_url, content.toString(), { headers: headers })
        .subscribe(
          (response: Response) => {
            let resp = response.json();
            this.fields = resp.fields;
            console.log(resp.fields);
          }
        );
    }

  }

  superSubmit() {
    console.log("Suoer submit pressed");
   // return this.formDataService.showSubmit();
    if (!this.formDataService.showSubmit()) {
      alert("Please fill and save all tabs before submitting");
    }
    else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('identifier', this.identifier);
      this.http.post("http://13.234.109.247:3000/api/submitForm", content.toString(), { headers: headers })
      .subscribe (
        (response: Response) => {
          console.log(response.json());
          alert("You form has been submitted");
        }
      );
    }
  }

  save(form: any): boolean {
    console.log(this.companyDetails);
    // if (!form.valid) {
    //   return false;
    // }

    this.formDataService.setCompanyDetails(this.companyDetails);
    this.formDataService.setDeclaration(this.declaration);
    return true;
  }

  submit(form: any) {
    // this.save(form);
    console.log(form);
    // Object.keys(form.controls).forEach(field => { // {1}
    //   const control = form.get(field);            // {2}
    //   control.markAsDirty({ onlySelf: true });       // {3}
    // });
    if (!form.valid) {
      alert("Form is not valid");
    }
    else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('flag', '3');
      content.set('identifier', this.identifier);
      content.set('bank_name', this.companyDetails.bank_name);
      content.set('bank_account_number', this.companyDetails.bank_account_number);
      content.set('bank_branch', this.companyDetails.bank_branch);
      content.set('ifsc', this.companyDetails.ifsc);
      content.set('company_type', this.companyDetails.company_type);
      content.set('vendor_type', this.companyDetails.vendor_type);
      content.set('industry_type', this.companyDetails.industry_type);
      content.set('aadhar', this.companyDetails.aadhar);
      content.set('esic', this.companyDetails.esic);
      content.set('gst', this.companyDetails.gst);
      content.set('ssi', this.companyDetails.ssi);
      content.set('pan', this.companyDetails.pan);
      content.set('tds', this.companyDetails.tds);
      content.set('exice', this.companyDetails.exice);
      content.set('effective_date', this.companyDetails.effective_date);
      this.http.post(this.url, content.toString(), { headers: headers })
        .subscribe(
          (response: Response) => {
            // alert("Form saved successfully, Please complete all tabs and click submit to continue");
            alert("Form saved successfully, Please complete all tabs and click submit to continue");
            this.save(form);
            this.formDataService.updates(3);
          },
          (error) => {
            let resp = error.json();
            console.log(resp);
            alert(resp.message);
          }
        );
    }
  }

  goTo(form: any, link: string) {
    console.log("goyo");
    if (this.save(form)) {
      console.log(link);
      this.router.navigate(['/starter/' + link, this.identifier, this.editable]);
    }
  }
  isTrue(attr: any) {
    // console.log("is true")
    if (this.editable != 1) {
      return false;
    }
    let st = JSON.stringify(this.fields);
    console.log("Stringified", st);
    console.log(st.indexOf(attr));
    console.log(attr);
    if (st.indexOf(attr) > -1) {
      return true;
    }
    else
      return false;
  }

  onFileChange(event) {
    let dec = <File>event.target.files[0];
          let ex = dec.name.indexOf('.');
          let extension = dec.name.substring(ex);
          this.fd.append('dec', dec, this.identifier+'dec'+extension);
  }

  upload () {
    this.fd.append("identifier",String(this.identifier));
    const headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // headers.append('Accept', 'application/json');
    console.log(this.fd);
    this.http.post("http://13.234.109.247:3000/api/uploadeDeclaration", this.fd)
    .subscribe(res => {
      console.log(res);
      alert("Files uploaded successfully");
      this.formDataService.updates(5);
      
    });
  }


}
