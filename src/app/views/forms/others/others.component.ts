import { Component, OnInit } from '@angular/core';
import { Promoter, Manufatureres, Sales, Declaration } from '../../../services/models/vedndors';
import { FormDataService } from '../../../services/form-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  constructor(private formDataService: FormDataService, private router: Router, private route: ActivatedRoute, private http: Http) { }
  public promoters: Promoter[];
  public manufacturers: Manufatureres[];
  public sales: Sales[];
  public declaration: Declaration;
  public identifier: string;
  public isChanged: boolean = false;
  public show = true;
  private url = "http://13.234.109.247:3000/api/save";
  public isChecked: any = { "value": false };
  public iseditable = 0;
  ngOnInit() {

    this.route.params.subscribe(
      params => {
        console.log(params);
        let identifier = params["identifier"];
        this.identifier = identifier;
        this.iseditable = params["update"];
        console.log(identifier);
        let data = this.formDataService.fetchData(identifier)
          .subscribe(
            (data: any) => {
              let rsp = data.json();
              console.log(rsp);
              if (rsp.data.is_submit == 1) {
                this.show = false;
              }
              //else if(this.submit == 1)
              console.log(this.formDataService.flag);
              if (this.formDataService.flago == 0) {
                this.formDataService.initFormData(rsp.data);
                this.formDataService.initOthers(rsp.salesData, rsp.manufacturersData, rsp.promotersData, rsp.branchData);
              }
              this.formDataService.setStatus(rsp.data);
              this.promoters = this.formDataService.getPromoters();
              this.sales = this.formDataService.getSales();
              this.manufacturers = this.formDataService.getManufacturers();
              this.declaration = this.formDataService.getDeclaration();
              if (this.promoters.length == 0) {
                this.addPromoter();
              }
              if (this.manufacturers.length == 0) {
                this.addManufacturers();
              }
              if (this.sales.length == 0) {
                this.addSales();
              }
              console.log(this.promoters);
            },
            (error) => {
              console.log("error aayi", error);
              console.log("no data");
              this.promoters = this.formDataService.getPromoters();
              this.sales = this.formDataService.getSales();
              this.manufacturers = this.formDataService.getManufacturers();
              this.declaration = this.formDataService.getDeclaration();
              if (this.promoters.length == 0) {
                this.addPromoter();
              }
              if (this.manufacturers.length == 0) {
                this.addManufacturers();
              }
              if (this.sales.length == 0) {
                this.addSales();
              }
              console.log(this.promoters);
            }

          )



      }
    );

  }

  superSubmit() {

    console.log(this.formDataService.showSubmit());
    if (!this.formDataService.showSubmit()) {
      alert("Please fill and save all tabs before submitting");
    }
    else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('identifier', this.identifier);
      this.http.post("http://13.234.109.247:3000/api/submitForm", content.toString(), { headers: headers })
        .subscribe(
          (response: Response) => {
            console.log(response.json());
            alert("You form has been submitted");
          }
        );
    }
  }

  save() {

    console.log(typeof (this.promoters[0]));
    console.log(this.promoters[0].promoter);
    if (this.isChanged) {
      this.formDataService.setPromoters(this.promoters);
      this.formDataService.setManufacturers(this.manufacturers);
      this.formDataService.setSales(this.sales);
    }
    this.isChanged = false;


    return true;
  }
  submit(personalForm) {
    if (!this.isChecked.value) {
      alert("Please check the declaration");

    }
    else {


      console.log(personalForm);
      let s = {};

      let p = [];
      let m = [];
      let sa = [];
      for (let d in this.promoters) {
        let s = {
          identifier: this.identifier,
          promoter: this.promoters[d].promoter,
        }
        p.push(s);
      }


      for (let d in this.sales) {
        let s = {
          identifier: this.identifier,
          product_supplied: this.sales[d].product_supplied,
          turnover: this.sales[d].turnover,
          business_percentage: this.sales[d].business_percentage,
        }
        sa.push(s);
      }

      for (let d in this.manufacturers) {
        let s = {
          identifier: this.identifier,
          certifications: this.manufacturers[d].certifications,
          location: this.manufacturers[d].location,
          monthly_production_capacity: this.manufacturers[d].monthly_production_capacity,
          num_of_machines: this.manufacturers[d].num_of_machines,
          product_type: this.manufacturers[d].product_type,
          technical_workers: this.manufacturers[d].technical_workers
        }
        m.push(s);
      }

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let content = new URLSearchParams();
      content.set('identifier', this.identifier);
      content.set('flag', '4');
      content.set('sales', JSON.stringify(sa));
      content.set('manu', JSON.stringify(m));
      content.set('proms', JSON.stringify(p));
      content.set('name', this.declaration.declaration_name);
      content.set('designation', this.declaration.declaration_designation);
      content.set('date', this.declaration.declaration_designation);
      content.set('place', this.declaration.declaration_place);
      //console.log(personalForm.value);
      this.http.post(this.url, content.toString(), { headers: headers })
        .subscribe(
          (response: Response) => {
            console.log(response.json());
            alert("Form saved successfully, Please complete all tabs and click submit to continue");
            this.save();
            this.formDataService.updates(4);
          },
          (error) => {
            let resp = error.json();
            console.log(resp);
            alert(resp.message);
          }
        );
    }
  }

  addPromoter() {
    let p: Promoter = new Promoter;
    //p.promoter = "";
    this.promoters.push(p);
  }

  addManufacturers() {
    let p: Manufatureres = new Manufatureres;
    this.manufacturers.push(p);
  }

  addSales() {
    let p: Sales = new Sales;
    this.sales.push(p);
  }

  goTo(form: any, link: string) {
    console.log("goyo");
    if (this.save()) {
      console.log(link);
      this.router.navigate(['/starter/' + link, this.identifier, this.iseditable]);
    }
  }
  test() {
    this.isChanged = true;
  }


}
