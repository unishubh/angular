import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators  } from '@angular/forms';
import { company_type, industry_type, vendor_type } from './../../form_data/vendor_link';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http, private fb: FormBuilder, private router : Router) { }
  private _url = 'http://13.234.109.247:3000/api/vendorDetails';
  private _url_form = 'http://13.234.109.247:3000/api/form';
  private submit_url = 'http://13.234.109.247:3000/api/submitVendor';
  private _fields_url = "http://13.234.109.247:3000/api/declineFields";
  public identifier: String;
  public isForm1: Boolean;
  public isForm2: Boolean;
  public company_type: any[] = company_type;
  public industry_type: any[] = industry_type;
  public vendor_type: any[] = vendor_type;
  public details: any;
  public name: String;
  public editable: Number;
  public fields: any[];
  public isData :boolean = false;
  public sales :any[];
  public isEdit : boolean = false;
  public manufacturers : any[];
  public promoters : any[];
  public isForm :boolean=false;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public onlyNums = "^[0-9]*$";
  public onlyAlpha = "^[A-Za-z]+$";

  vendorForm: FormGroup;
  vendorForm2: FormGroup;
  ngOnInit() {
    this.isForm1 = false;
    this.isForm2 = false;
    this.route.params.subscribe(
      params => {
        console.log(params);
        this.identifier = params["id"];
        this.editable = params["update"];
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.get(this._url_form + '/' + params["id"], { headers: headers })
          .subscribe(
            (respo: Response) => {
              let rsp = respo.json();
              if (rsp.form == 1) {
                this.isForm1 = true;
                
              }
              else if (rsp.form == 2) {
                this.isForm2 = true;
              }
            }
          );


        if (this.editable == 1) {
          this.isEdit = true;
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
                //
                
                this.http.get(this._url + '/' + params["id"], { headers: headers })
                  .subscribe(
                    (response: Response) => {
                      let resp = response.json();
                      console.log(resp);


                      this.details = resp.details[0];
                      this.name = this.details.vendor_name;
                      console.log(this.details, this.name);
                      this.isData = true;
                      if(this.editable) {
                        this.sales = resp.sales;
                        this.manufacturers = resp.manufacturers;
                        this.promoters = resp.promoters;
                        this.setPromoters();
                        this.setManufactureres();
                        this.setSales();
                      }

                    });
              },
            );

        }
        else {
          this.isData = true;
        }
      });

    this.vendorForm = this.fb.group({
      identifier: [this.identifier],
      name: ['', Validators.pattern(this.onlyAlpha)],
      address: [],
      city: ['', Validators.pattern(this.onlyAlpha)],
      pin_code: ['', Validators.compose([Validators.minLength(5),Validators.pattern(this.onlyNums)])],
      phone: ['', Validators.compose([Validators.minLength(10),Validators.pattern(this.onlyNums)])],
      state: [],
      establishment_year: ['', Validators.compose([Validators.minLength(4),Validators.pattern(this.onlyNums)])],
      website: [],
      contact_name: ['', Validators.pattern(this.onlyAlpha)],
      email: ['', Validators.pattern(this.emailPattern)],
      designation: [],
      contact_phone: ['', Validators.compose([Validators.minLength(10),Validators.pattern(this.onlyNums)])],
      bank_name: [],
      bank_account_number: [],
      bank_branch: [],
      ifsc: [],
      company_type: [],
      vendor_type: [],
      industry_type: [],
      gst: [],
      pan: [],
      ssi: [],
      effective_date: [],
      esic: [],
      promoters: this.fb.array([
        this.initPromoters()
      ]),
      sales: this.fb.array([
        this.initSales()
      ]),
      manufacturers: this.fb.array([
        this.initManufacturers()
      ])

    });

   // this.sales = this.vendorForm.controls.sales.controls;

    this.vendorForm2 = this.fb.group({
      identifier: [this.identifier],
      name: ['', Validators.pattern(this.onlyAlpha)],
      address: [],
      city: [],
      pin_code: ['', Validators.compose([Validators.minLength(5),Validators.pattern(this.onlyNums)])],
      phone: ['', Validators.compose([Validators.minLength(10),Validators.pattern(this.onlyNums)])],
      state: [],
      establishment_year: ['', Validators.compose([Validators.minLength(4),Validators.pattern(this.onlyNums)])],
      website: [],
      contact_name: ['', Validators.pattern(this.onlyAlpha)],
      email: ['', Validators.pattern(this.emailPattern)],
      designation: [],
      contact_phone: ['', Validators.compose([Validators.minLength(10),Validators.pattern(this.onlyNums)])],
      bank_name: [],
      bank_account_number: [],
      bank_branch: [],
      ifsc: [],
      tds: [],
      company_type: [],
      vendor_type: [],
      industry_type: [],
      gst: [],
      pan: [],
      aadhar: ['', Validators.compose([Validators.minLength(12),Validators.pattern(this.onlyNums)])],
      esic: [],
      pf: [],
      exice: [],
      ssi: [],
      effective_date: [],
      promoters: this.fb.array([
        this.initPromoters()
      ]),
      sales: this.fb.array([
        this.initSales(),

      ]),
      manufacturers: this.fb.array([
        this.initManufacturers()
      ])

    });

    
  }
  
  initPromoters() {
    return this.fb.group({
      identifier: [this.identifier],
      promoter: []
    })
  }
  

  initSales() {
    
    return this.fb.group({
      identifier: [this.identifier],
      product_supplied: [],
      turnover: [],
      percent: [],
    })
  }

  initManufacturers() {
    return this.fb.group({
      identifier: [this.identifier],
      location: [],
      product_type_man: [],
      number_of_machines: [],
      monthly_production_capacity: [],
      technical_workers: [],
      certification: []
    })
  }

  addSales() {
    console.log("adding sale");
    let control;
    if (this.isForm1) {
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
    if (this.isForm1) {
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
    if (this.isForm1) {
      control = <FormArray>this.vendorForm.controls['manufacturers'];
    }
    else {
      control = <FormArray>this.vendorForm2.controls['manufacturers'];
    }
    control.push(this.initManufacturers());
  }

  onSubmit() {
    console.log(this.vendorForm.value);
    console.log(this.promoters);
    var headers = new Headers();
    let form;
    if (this.isForm1) {
      form = this.vendorForm;
    }
    else {
      form = this.vendorForm2;
    }
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let content = new URLSearchParams();
    content.set('edit', String(this.editable));
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

    this.http.post(this.submit_url, content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log(response.json());
          alert('Thank you for filling the form');
        }
      );
  }

  onSubmit2() {
    console.log(this.vendorForm2.value);
  }

  isTrue(attr: any) {
    // console.log("is true")
    if(!this.isEdit) {
      return false;
    }
    let st = JSON.stringify(this.fields);
    // console.log("Stringified",st);
    // console.log(st.indexOf(attr));
    // console.log(attr);
    if (st.indexOf(attr) > -1) {
      return true;
    }
    else 
    return false;
  }

  setPromoters() {
    let control;
    console.log("promoters c");
    if (this.isForm1) {
      control = <FormArray>this.vendorForm.controls['promoters'];
    }
    else {
      control = <FormArray>this.vendorForm2.controls['promoters'];
    }
    this.promoters.forEach(x => {
      control.push(this.fb.group({
        identifier: this.identifier,
        promoter: x.promoter
      }))
    });
  }

  setManufactureres() {
    let control;
    console.log("promoters c");
    if (this.isForm1) {
      control = <FormArray>this.vendorForm.controls['manufacturers'];
    }
    else {
      control = <FormArray>this.vendorForm2.controls['manufacturers'];
    }
    this.manufacturers.forEach(x => {
      control.push(this.fb.group({
        identifier: this.identifier,
        monthly_production_capacity: x.monthly_production_capacity,
        certification: x.certifications,
        number_of_machines: x.num_of_machines,
        product_type_man: x.product_type,
        technical_workers: x.technical_workers ,
        location: x.location
      }))
    });
  }

  setSales() {
    let control;
    console.log("promoters c");
    if (this.isForm1) {
      control = <FormArray>this.vendorForm.controls['sales'];
    }
    else {
      control = <FormArray>this.vendorForm2.controls['sales'];
    }
    this.sales.forEach(x => {
      control.push(this.fb.group({
        identifier: this.identifier,
        percent: x.business_percentage,
        product_supplied: x.products,
        turnover: x.turnover,
      }))
    });
  }
}
