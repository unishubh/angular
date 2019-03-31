import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { lobs, categories, product_types, types } from '../form_data/initVendor';

@Component({
  selector: 'app-initvendor',
  templateUrl: './initvendor.component.html',
  styleUrls: ['./initvendor.component.css']
})
export class InitvendorComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }
  vendorForm: FormGroup;
  public lobs = lobs;
  public categories = categories;
  public product_types = product_types;
  public types = types;
  //public categories: any[] = categories;
  //public product_type :any[] = product_types;
  private _url = "http://13.234.109.247:3000/api/addVendor";
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public onlyNums = "^[0-9]*$";
  public onlyAlpha = "^[A-Za-z]+$";
  public omitLevels: any[] = [{ level: 1, checked: false }, { level: 2, checked: false }, { level: 3, checked: false }, { level: 4, checked: false }, { level: 5, checked: false }]
  public display3: String = "block";
  ngOnInit() {
    this.vendorForm = this.fb.group({
      company: [''],
      lob: [],
      category: [],
      products: this.fb.array([
        this.initProducts(),
      ]),
      name: [],
      product_type: [],
      type: [],
      country: [],
      buying_mode: [],
      payment_term: [],
      incoterm: [],
      form_allocated: ['1'],
      vendor_email: ['', Validators.pattern(this.emailPattern)],
    });
  }

  initProducts() {
    return this.fb.group({
      product: []
    })
  };

  getProducts() {
    console.log(this.vendorForm.get('products') as FormArray);
    return this.vendorForm.get('products') as FormArray;
  }

  addProduct() {
    console.log("adding product");
    const control = <FormArray>this.vendorForm.controls['products'];
    control.push(this.initProducts());
  }

  onSubmit() {
    if (!this.vendorForm.valid) {
      console.log("Invlid");
      return;
    }

    let levels = this.omittedLevels;

    console.log("SUbmit pressed");
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    let content = new URLSearchParams();
    content.set('levels', JSON.stringify(levels));
    content.set('business_type', this.vendorForm.value.company);
    content.set('lob', this.vendorForm.value.lob);
    content.set('category', this.vendorForm.value.category);
    content.set('product_type', this.vendorForm.value.product_type);
    content.set('type', this.vendorForm.value.type);
    content.set('country', this.vendorForm.value.country);
    content.set('buying_mode', this.vendorForm.value.buying_mode);
    content.set('payment_term', this.vendorForm.value.payment_term);
    content.set('incoterm', this.vendorForm.value.incoterm);
    //content.set('business_type', this.vendorForm.value.business_type);
    content.set('products', JSON.stringify(this.vendorForm.value.products));
    content.set('form_allocated', this.vendorForm.value.form_allocated);
    content.set('vendor_email', this.vendorForm.value.vendor_email);
    content.set('name', this.vendorForm.value.name);


    this.http.post(this._url, content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log(response.json());
          let resp = response.json();
          if (resp.message == "Vendor created successfully") {
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

  get omittedLevels() { // right now: ['1','3']
    console.log(this.omitLevels);
    return this.omitLevels
      .filter(opt => opt.checked)
      .map(opt => opt.level)
  }

  showModal() {
    this.display3 = "block";
  }

}
