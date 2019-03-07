import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {Http, Headers, Response} from '@angular/http';
import {lobs, categories, product_types, types} from '../../form_data/initVendor';

@Component({
  selector: 'app-inhousevendors',
  templateUrl: './inhousevendors.component.html',
  styleUrls: ['./inhousevendors.component.css']
})
export class InhousevendorsComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }
  vendorForm: FormGroup;
  public lobs = lobs;
  public categories = categories;
  public product_types = product_types;
  public types = types;
  private _url = "http://localhost:3000/api/addVendor";
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public onlyNums = "^[0-9]*$";
  public onlyAlpha = "^[A-Za-z]+$";
  public display3 = 'block';
  public omitLevels: any[] = [{ level: 1, checked: false }, { level: 2, checked: false }, { level: 3, checked: false }, { level: 4, checked: false }, { level: 5, checked: false }]
  ngOnInit() {
    this.vendorForm = this.fb.group({
      business_entity: [],
      expenses: [],
      code: [],
      name:[],
      planning_group:[],
      payment_method:[],
      nature_of_expense:[],
      contact_name:[],
      contact_phone:[],
      vendor_category:[],
      cfo_name:[],
      tds:[],
      country: [],
      payment_term: [],
      form_allocated: ['2'],
      emp_code:[],
      cfo_code:[],
      type:[],
      vendor_email: ['', Validators.pattern(this.emailPattern)],
    });
  }

  get omittedLevels() { // right now: ['1','3']
  console.log(this.omitLevels);
  return this.omitLevels
    .filter(opt => opt.checked)
    .map(opt => opt.level)
}


  onSubmit() {
    let levels = this.omittedLevels;

    console.log("SUbmit pressed");
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization',`Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    let content = new URLSearchParams();
    content.set('levels', JSON.stringify(levels));
    content.set('business_type', this.vendorForm.value.business_entity);
    content.set('expenses', this.vendorForm.value.expenses);
    content.set('code', this.vendorForm.value.code);
    content.set('name', this.vendorForm.value.name);
    content.set('planning_group', this.vendorForm.value.planning_group);
    content.set('payment_method', this.vendorForm.value.payment_method);
    content.set('nature_of_expense', this.vendorForm.value.nature_of_expense);
    content.set('contact_name', this.vendorForm.value.contact_name);
    content.set('contact_phone', this.vendorForm.value.contact_phone);
    content.set('vendor_category', this.vendorForm.value.vendor_category);
    content.set('cfo_name', this.vendorForm.value.cfo_name);
    content.set('tds', this.vendorForm.value.tds);
    content.set('country', this.vendorForm.value.country);
    content.set('payment_term', this.vendorForm.value.payment_term);
    content.set('form_allocated', this.vendorForm.value.form_allocated);
    content.set('emp_code', this.vendorForm.value.emp_code);
    content.set('cfo_code', this.vendorForm.value.cfo_code);
    content.set('type', this.vendorForm.value.type);
    content.set('vendor_email', this.vendorForm.value.vendor_email);
  

    this.http.post(this._url,content.toString(), {headers:headers})
      .subscribe(
        (response: Response) => {
          console.log(response.json());
          let resp = response.json();
          if(resp.message == "Vendor created successfully") {
            alert("Vendor Initiated Successfully");
            this.router.navigate(['starter/vendorList']);

          }
          
        },
        (error) => {
          alert('Something Went Wrong');
          console.log(error);
        }
      );
    console.log(this.vendorForm.value);
  }

  showModal() {
    this.display3 = "block";
  }

}
