import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from "@angular/http"
import { formData, CompanyContact, CompanyDetails, Contact, Promoter, Sales, Manufatureres } from './models/vedndors';

@Injectable()
export class FormDataService {

  private formData: formData = new formData();
  private isCompnayContactValid: boolean = false;
  private isCompnayDetailsValid: boolean = false;
  private isContactValid: boolean = false;
  private _fields_url = "http://localhost:3000/api/vendorDetails";
  public flag = 0;
  public flago = 0;

  constructor(public http: Http) { }

  public fetchData(identifier: string) {

    let content = new URLSearchParams();

    content.set('vendor_id', String(identifier));
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');

    console.log("getting fields");
    return this.http.get(this._fields_url + "/" + identifier, { headers: headers });
  }

  initFormData(data: any) {
    console.log("init data");
    console.log(data);
    this.flag = 1;
    this.setComapyContact(data);
    this.setCompanyDetails(data);
    this.setContact(data);

    console.log(this.formData.vendor_name);
    console.log(this.formData.company_type);
  }

  initOthers(s, m, p) {
    console.log("inniting others");
    this.flago = 1;
    this.setSales(s);
    this.setPromoters(p);
    this.setManufacturers(m);

  }


  getCompanyContact(): CompanyContact {

    console.log("getting contactscop");
    console.log(this.formData.vendor_name);
    var companyContact: CompanyContact = {
      vendor_name: this.formData.vendor_name,
      office_address: this.formData.office_address,
      city: this.formData.city,
      pin_code: this.formData.pin_code,
      phone: this.formData.phone,
      state: this.formData.state,
      establishment_year: this.formData.establishment_year,
      website: this.formData.website,
      company_contact: this.formData.company_contact,
      others: this.formData.others,
    }

    return companyContact;

  }

  setPromoters(data) {
    let pro: Promoter[];
    this.formData.promoter.length = 0;
    let d: any;
    console.log(typeof (data), data);
    for (d = 0; d < data.length; d++) {
      console.log(data[d], data[d].promoter);
      let s: Promoter = new Promoter();
      s.promoter = data[d].promoter;

      this.formData.promoter.push(s);
    }
    // for (d in data) {
    //   console.log(data[d].promoter);

    // }
    console.log(this.formData.promoter);
    console.log(this.formData);

  }

  setSales(data) {
    console.log(data);

    this.formData.sale.length = 0;
    let d: any;
    for (d = 0; d < data.length; d++) {
      let s: Sales = new Sales();
      s.turnover = data[d].turnover;
      s.business_percentage = data[d].business_percentage;
      s.product_supplied = data[d].product_supplied || data[d].products;

      this.formData.sale.push(s);
    }
    console.log(this.formData.sale);
  }

  setManufacturers(data) {
    this.formData.manufatureres.length = 0;
    let d: any;
    for (d = 0; d < data.length; d++) {
      let s: Manufatureres = new Manufatureres();
      s.certifications = data[d].certifications;
      s.location = data[d].location;
      s.monthly_production_capacity = data[d].monthly_production_capacity;
      s.num_of_machines = data[d].num_of_machines;
      s.product_type = data[d].product_type;
      s.technical_workers = data[d].technical_workers;

      this.formData.manufatureres.push(s);
    }
  }


  getPromoters() {
    console.log(this.formData);
    let promoters: Promoter[] = [];
    for (let d = 0; d < this.formData.promoter.length; d++) {
      let s: Promoter = new Promoter();
      s.promoter = this.formData.promoter[d].promoter;
      promoters.push(s);
    }
    console.log(promoters);
    return promoters;

  }

  getSales() {
    let sales: Sales[] = [];
    for (let d = 0; d < this.formData.sale.length; d++) {
      let s: Sales = new Sales();
      s.business_percentage = this.formData.sale[d].business_percentage;
      s.turnover = this.formData.sale[d].turnover;
      s.product_supplied = this.formData.sale[d].product_supplied;

      sales.push(s);
    }
    console.log(sales);
    return sales;
  }

  getManufacturers() {
    let manufatureres: Manufatureres[] = [];
    for (let e = 0; e < this.formData.manufatureres.length; e++) {
      let d: Manufatureres = new Manufatureres();
      d.certifications = this.formData.manufatureres[e].certifications;
      d.location = this.formData.manufatureres[e].location;
      d.monthly_production_capacity = this.formData.manufatureres[e].monthly_production_capacity;
      d.num_of_machines = this.formData.manufatureres[e].product_type;
      d.product_type = this.formData.manufatureres[e].product_type;
      d.technical_workers = this.formData.manufatureres[e].technical_workers;

      manufatureres.push(d);
    }
    console.log(manufatureres);
    return manufatureres;
  }


  setComapyContact(data) {
    console.log("setting compcont data");
    this.isCompnayContactValid = true;
    this.formData.vendor_name = data.vendor_name;
    this.formData.office_address = data.office_address;
    this.formData.city = data.city;
    this.formData.pin_code = data.pin_code;
    this.formData.website = data.website;
    this.formData.state = data.state;
    this.formData.establishment_year = data.establishment_year;
    this.formData.phone = data.phone;
    this.formData.company_contact = data.company_contact;
    //this.formData.others = data.others;
    console.log(this.formData.vendor_name);
  }

  getCompanyDetails(): CompanyDetails {


    var companyDetails = {
      company_type: this.formData.company_type,
      industry_type: this.formData.industry_type,
      vendor_type: this.formData.vendor_type,
      gst: this.formData.gst,
      pan: this.formData.pan,
      ssi: this.formData.ssi,
      effective_date: this.formData.effective_date,
      bank_name: this.formData.bank_name,
      bank_account_number: this.formData.bank_account_number,
      ifsc: this.formData.ifsc,
      bank_branch: this.formData.bank_branch,
      tds: this.formData.tds,
      aadhar: this.formData.aadhar,
      exice: this.formData.exice,
      esic: this.formData.esic,
      pf: this.formData.pf,
      company_details: this.formData.company_details,

    }
    return companyDetails;
  }

  setCompanyDetails(data: CompanyDetails) {
    console.log("setting companydetails");
    this.formData.company_type = data.company_type;
    this.formData.industry_type = data.industry_type;
    this.formData.vendor_type = data.vendor_type;
    this.formData.gst = data.gst;
    this.formData.pan = data.pan;
    this.formData.ssi = data.ssi;
    this.formData.effective_date = data.effective_date;
    this.formData.bank_name = data.bank_name;
    this.formData.bank_account_number = data.bank_account_number;
    this.formData.ifsc = data.ifsc;
    this.formData.bank_branch = data.bank_branch;
    this.formData.tds = data.tds;
    this.formData.exice = data.exice;
    this.formData.esic = data.esic;
    this.formData.aadhar = data.aadhar;
    this.formData.pf = data.pf;
    this.formData.company_details = data.company_details;
  }


  getContact(): Contact {
    var contact = {
      contact_person: this.formData.contact_person,
      email: this.formData.email,
      designation: this.formData.designation,
      contact_phone: this.formData.contact_phone,
      contact: this.formData.contact,
    }
    return contact;
  }


  setContact(data) {
    console.log("setting contact");
    this.isContactValid = true;
    this.formData.contact_person = data.contact_person || data.contact_name;
    this.formData.email = data.email;
    this.formData.designation = data.designation;
    this.formData.contact_phone = data.contact_phone;
    this.formData.contact = data.contact;
  }

  setStatus(data) {
    this.formData.company_contact = data.company_contact;
    this.formData.company_details = data.company_details;
    this.formData.contact = data.contact;
    this.formData.others = data.others;
    this.formData.files = data.files;
  }

  showSubmit() {
    console.log("here");
    console.log(this.formData.others, this.formData.company_details, this.formData.company_contact, this.formData.contact, this.formData.files);
    if (this.formData.others == 1 && this.formData.company_details == 1 && this.formData.company_contact == 1 && this.formData.contact == 1 && this.formData.files == 1) {
      return true;
    }
    else {
      return false;
    }
  }

  updates(n: number) {
    switch (n) {
      case 1: {
        this.formData.company_contact = 1;
        break;
      }
      case 2: {
        this.formData.contact = 1;
        break;
      }
      case 3: {
        this.formData.company_details = 1;
        break;
      }
      case 4: {
        this.formData.others = 1;
        break;
      }
      case 5: {
        this.formData.files = 1;
        break;
      }
    }
  }




}
