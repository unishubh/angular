import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {Http, Headers, Response} from '@angular/http';
import {category, product_type} from './../form_data/add_vendor';

@Component({
  selector: 'app-initvendor',
  templateUrl: './initvendor.component.html',
  styleUrls: ['./initvendor.component.css']
})
export class InitvendorComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: Http) { }
  vendorForm: FormGroup;
  public category: any[] = category;
  public product_type :any[] = product_type;
  private _url = "http://localhost:3000/api/addVendor"
  ngOnInit() {
    this.vendorForm = this.fb.group({
      company: [],
      lob: [],
      category: [],
      products: this.fb.array([
        this.initProducts(),
      ]),
      product_type: [],
      type: [],
      country: [],
      buying_mode: [],
      payment_term: [],
      incoterm: [],
      form_allocated: [],
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
    console.log("SUbmit pressed");
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization',`Bearer ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    let content = new URLSearchParams();
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
    content.set('form_allocated',this.vendorForm.value.form_allocated);


    this.http.post(this._url,content.toString(), {headers:headers})
      .subscribe(
        (response: Response) => {
          console.log(response.json());
        }
      );
    console.log(this.vendorForm.value);
  }

}
