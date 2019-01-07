import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {company_type, industry_type, vendor_type} from './../../form_data/vendor_link';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http, private fb: FormBuilder) { }
  private _url = 'http://localhost:3000/api/form';
  private submit_url = 'http://localhost:3000/api/submitVendor'
  public identifier: String;
  public isForm1: Boolean;
  public isForm2 : Boolean;
  public company_type :any[] = company_type;
  public industry_type :any[] = industry_type;
  public vendor_type :any[] = vendor_type;

  vendorForm: FormGroup;
  vendorForm2 : FormGroup;
  ngOnInit() {
    this.isForm1 = false;
    this.isForm2 = false;
    this.route.params.subscribe(
      params => {
        console.log(params);
        this.identifier = params["id"];
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.get(this._url + '/' + params["id"], { headers: headers })
          .subscribe(
            (response: Response) => {
              let resp = response.json();
              if (resp.form == 1) {
                this.isForm1 = true;
              }
              else if(resp.form == 2) {
                this.isForm2 = true;
              }
            });
          });

          this.vendorForm = this.fb.group({
            identifier: [this.identifier],
            name :[],
            address: [],
            city :[],
            pin_code:[],
            phone:[],
            state:[],
            establishment_year:[],
            website:[],
            contact_name:[],
            email:[],
            designation:[],
            contact_phone:[],
            bank_name:[],
            bank_account_number:[],
            bank_branch:[],
            ifsc:[],
            company_type:[],
            vendor_type:[],
            industry_type:[],
            gst:[],
            pan:[],
            ssi:[],
            effective_date:[],
            esic:[],
            promoters : this.fb.array([
              this.initPromoters()
            ]),
            sales: this.fb.array([
              this.initSales()
            ]),
            manufacturers: this.fb.array([
              this.initManufacturers()
            ])

          });

          this.vendorForm2 = this.fb.group({
            identifier: [this.identifier],
            name :[],
            address: [],
            city :[],
            pin_code:[],
            phone:[],
            state:[],
            establishment_year:[],
            website:[],
            contact_name:[],
            email:[],
            designation:[],
            contact_phone:[],
            bank_name:[],
            bank_account_number:[],
            bank_branch:[],
            ifsc:[],
            tds:[],
            company_type:[],
            vendor_type:[],
            industry_type:[],
            gst:[],
            pan:[],
            aadhar:[],
            esic:[],
            pf:[],
            exice:[],
            ssi:[],
            effective_date:[],
            promoters : this.fb.array([
              this.initPromoters()
            ]),
            sales: this.fb.array([
              this.initSales()
            ]),
            manufacturers: this.fb.array([
              this.initManufacturers()
            ])
      
          });
    }

    initPromoters(){
      return this.fb.group({
        identifier: [this.identifier],
        promoter: []
      })
    }

    initSales(){
      return this.fb.group({
        identifier: [this.identifier],
        product_supplied:[],
        turnover:[],
        percent:[],
      })
    }

    initManufacturers(){
      return this.fb.group({
        identifier :[this.identifier],
        location:[],
        product_type_man:[],
        number_of_machines:[],
        monthly_production_capacity:[],
        technical_workers:[],
        certification:[]
      })
    }

    addSales() {
      console.log("adding sale");
      let control;
      if(this.isForm1) {
        control = <FormArray>this.vendorForm.controls['sales'];
      }
      else {
        control = <FormArray>this.vendorForm2.controls['sales'];
      }
      control.push(this.initSales());
    }

    addPromoter() {
      console.log("adding promoter");
      let control;
      if(this.isForm1) {
        control = <FormArray>this.vendorForm.controls['promoters'];
      }
      else {
        control = <FormArray>this.vendorForm2.controls['promoters'];
      }
      control.push(this.initPromoters());
    }

    addManufacturer() {
      console.log("adding manufacturer");
      let control;
      if(this.isForm1) {
        control = <FormArray>this.vendorForm.controls['manufacturers'];
      }
      else {
        control = <FormArray>this.vendorForm2.controls['manufacturers'];
      }
      control.push(this.initManufacturers());
    }

    onSubmit() {
      console.log(this.vendorForm.value.sales.value);
      var headers = new Headers();
      let form;
      if(this.isForm1) {
        form = this.vendorForm;
      }
      else {
        form = this.vendorForm2;
      }
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('identifier', form.value.identifier);
      content.set('name', form.value.name);
      content.set('address', form.value.address);
      content.set('city', form.value.city);
      content.set('pin_code', form.value.pin_code);
      content.set('phone', form.value.phone);
      content.set('state', form.value.state);
      content.set('establishment_year', form.value.establishment_year);
      content.set('website', form.value.website);
      content.set('contact_name', form.value.contact_name);
      content.set('email', form.value.email);
      content.set('designation', form.value.designation);
      content.set('contact_phone', form.value.contact_phone);
      content.set('bank_name', form.value.bank_name);
      content.set('bank_account_number', form.value.bank_account_number);
      content.set('bank_branch', form.value.bank_branch);
      content.set('ifsc', form.value.ifsc);
      content.set('company_type', form.value.company_type);
      content.set('vendor_type', form.value.vendor_type);
      content.set('industry_type', form.value.industry_type);
      content.set('aadhar', form.value.aadhar);
      content.set('esic', form.value.esic);
      content.set('gst', form.value.gst);
      content.set('ssi', form.value.ssi);
      content.set('pan', form.value.pan);
      content.set('effective_date', form.value.effective_date);
      content.set('promoters', JSON.stringify(form.value.promoters));
      content.set('sales', JSON.stringify(form.value.sales));
      content.set('manufacturers', JSON.stringify(form.value.manufacturers));

      this.http.post(this.submit_url,content.toString(), {headers:headers})
      .subscribe(
        (response: Response) => {
          console.log(response.json());
        }
      );
    }

    onSubmit2() {
      console.log(this.vendorForm2.value);
    }

}
