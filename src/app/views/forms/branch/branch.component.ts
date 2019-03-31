import { Component, OnInit } from '@angular/core';
import { Branches } from '../../../services/models/vedndors';
import { FormDataService } from '../../../services/form-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private formDataService: FormDataService, private router: Router, private route: ActivatedRoute, private http: Http) { }
  public isChanged: boolean = false;
  public show = true;
  public branches: Branches[]=[];
  private url = "http://13.234.109.247:3000/api/save";
  public isChecked: any = { "value": false };
  public iseditable = 0;
  public identifier: string;
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
              if (this.formDataService.flagb == 0) {
                this.formDataService.initOthers(rsp.salesData, rsp.manufacturersData, rsp.promotersData, rsp.branchData);
              }
              this.formDataService.setStatus(rsp.data);
              this.branches = this.formDataService.getBranches();
              console.log("Length", this.branches.length);

              if (this.branches.length == 0) {
                console.log("Adding Branch");
                this.addBranch();
              }
              //console.log(this.promoters);
            },
            (error) => {
              console.log("error aayi", error);
              console.log("no data");
              this.branches = this.formDataService.getBranches();
              if (this.branches.length == 0) {
                this.addBranch();
              }
              //console.log(this.promoters);
            }

          )



      }
    );

  }

  addBranch() {
    let p: Branches = new Branches;
    this.branches.push(p);
  }

  save() {


    if (this.isChanged) {
      this.formDataService.setBranches(this.branches);
    }
    this.isChanged = false;
    return true;
  }

  submit(personalForm) {



    console.log(this.branches, this.branches.length);


    let s = {};
    let p = [];
    for (let d in this.branches) {
      console.log(this.branches[d].branch_address, d);
      let s = {
        identifier: this.identifier,
        branch_address: this.branches[d].branch_address,
        branch_city: this.branches[d].branch_city,
        branch_gst_number: this.branches[d].branch_gst_number,
        branch_phone_number: this.branches[d].branch_phone_number,
        branch_pin_code: this.branches[d].branch_pin_code,
        branch_state: this.branches[d].branch_state,


      }
      console.log(s);
      p.push(s);
    }
    console.log(p);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let content = new URLSearchParams();
    content.set('identifier', this.identifier);
    content.set('flag', '5');
    content.set('branch', JSON.stringify(p));
    this.http.post(this.url, content.toString(), { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log(response.json());
          alert("Form saved successfully, Please complete all tabs and click submit to continue");
          this.save();
          this.formDataService.updates(6);
        },
        (error) => {
          let resp = error.json();
          console.log(resp);
          alert(resp.message);
        }
      );

  }

  goTo(form: any, link: string) {
    console.log("goyo");
    if (this.save()) {
      console.log(link);
      this.router.navigate(['/starter/' + link, this.identifier, this.iseditable]);
    }
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

  showForm() {
    console.log(this.branches.length, this.isChecked.value);
    if(this.branches[0].branch_city  || this.isChecked.value == true) {
      return true;
    }
    else {
      return false;
    }
  }


}
