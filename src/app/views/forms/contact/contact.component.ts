import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Contact } from '../../../services/models/vedndors';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contact: Contact;
  public identifier: string;
  public editable: number = 2;
  public show = true;
  public fields: any[];
  private url = "http://localhost:3000/api/save";
  private _fields_url = "http://localhost:3000/api/declineFields";
  constructor(private route: ActivatedRoute, private router: Router, private formDataService: FormDataService, private http: Http) { }

  ngOnInit() {
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
              console.log(rsp.data, rsp);
              if(rsp.data.is_submit == 1) {
                this.show = false;
              }
              console.log(this.formDataService.flag);
              if (this.formDataService.flag == 0) {
                this.formDataService.initFormData(rsp.data);
              }
              this.formDataService.setStatus(rsp.data);
              this.contact = this.formDataService.getContact();
              console.log(this.contact);
            },
            (error) => {
              console.log("error aayi", error);
              console.log("no data");
              this.contact = this.formDataService.getContact();
              console.log(this.contact);
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
    if (!this.formDataService.showSubmit()) {
      alert("Please fill and save all tabs before submitting");
    }
    else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('identifier', this.identifier);
      this.http.post("http://localhost:3000/api/submitForm", content.toString(), { headers: headers })
      .subscribe (
        (response: Response) => {
          console.log(response.json());
          alert("You form has been submitted");
        }
      );
    }
  }

  submit(form: any) {
    // Object.keys(form.controls).forEach(field => { // {1}
    //   const control = form.get(field);            // {2}
    //   control.markAsDirty({ onlySelf: true });       // {3}
    // });
    if (!form.valid) {
      alert("Form is not valid");
    }

    else {
      console.log("saving");
      console.log(this.contact);
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('flag', '2');
      content.set('identifier', this.identifier);
      content.set('contact_person', this.contact.contact_person);
      content.set('email', this.contact.email);
      content.set('designation', this.contact.designation);
      content.set('contact_phone', String(this.contact.contact_phone));

      console.log("hitting");
      this.http.post(this.url, content.toString(), { headers: headers })
        .subscribe(
          (response: Response) => {
            console.log(response);
            alert("Form saved successfully, Please complete all tabs and click submit to continue");
            this.save(form);
            this.formDataService.updates(2);

          },
          (error) => {
            let resp = error.json();
            console.log(resp);
            alert(resp.message);
          }
        );
    }
  }

  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }

    this.formDataService.setContact(this.contact);
    return true;
  }

  goTo(form: any, link: string) {
    console.log("goyo");
    if (this.save(form)) {
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

}
