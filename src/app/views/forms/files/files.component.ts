import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { FormDataService } from '../../../services/form-data.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  public aadhar : File;
  fd = new FormData();
  public identifier : Number;
  private url = "http://13.234.109.247:3000/api/save";
  public editable :any;
  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private formDataService: FormDataService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params);
        let identifier = params["identifier"];
        this.editable = params["update"];
        this.identifier = identifier;
        console.log(identifier);
        
      });

      let data = this.formDataService.fetchData(String(this.identifier))
          .subscribe(
            (data: any) => {
              let rsp = data.json();        
              this.formDataService.setStatus(rsp.data);
            },
            (error) => {
              console.log("error aayi", error);
              console.log("no data");
            }

          )

  }


  onFileChange(event, c) {
    console.log(c);
    if(event.target.files.length > 0) {

      switch(c) {
        case '9' : {
          let pan = <File>event.target.files[0];
          let ex = pan.name.indexOf('.');
          let extension = pan.name.substring(ex);
          this.fd.append('pan', pan, this.identifier+'pan'+extension);
          break;
        }
        case '1': {
          let aadhar = <File>event.target.files[0];
          let ex = aadhar.name.indexOf('.');
          let extension = aadhar.name.substring(ex);
          this.fd.append('aadhar', aadhar, this.identifier+'aadhar'+extension);
          break;
        }
        case '3': {
          let cheque = <File>event.target.files[0];
          let ex = cheque.name.indexOf('.');
          let extension = cheque.name.substring(ex);
          this.fd.append('cheque', cheque, this.identifier+'cheque'+extension);
          break;
        }
        case '4': {
          let iso = <File>event.target.files[0];
          let ex = iso.name.indexOf('.');
          let extension = iso.name.substring(ex);
          this.fd.append('iso', iso, this.identifier+'iso'+extension);
          break;
        }
        case '5': {
          let environment_certification = <File>event.target.files[0];
          let ex = environment_certification.name.indexOf('.');
          let extension = environment_certification.name.substring(ex);
          this.fd.append('environment_certification', environment_certification, this.identifier+'environment_certification'+extension);
          break;
        }
        case '6': {
          let pf_file = <File>event.target.files[0];
          let ex = pf_file.name.indexOf('.');
          let extension = pf_file.name.substring(ex);
          this.fd.append('pf_file', pf_file, this.identifier+'pf_file'+extension);
          break;
        }
        case '7': {
          let esic_copy = <File>event.target.files[0];
          let ex = esic_copy.name.indexOf('.');
          let extension = esic_copy.name.substring(ex);
          this.fd.append('esic_copy', esic_copy, this.identifier+'esic_copy'+extension);
          break;
        }
        case '8': {
          let excise_file = <File>event.target.files[0];
          let ex = excise_file.name.indexOf('.');
          let extension = excise_file.name.substring(ex);
          this.fd.append('excise_file', excise_file, this.identifier+'excise_file'+extension);
          break;
        }
        case '2': {
          let address_proof = <File>event.target.files[0];
          let ex = address_proof.name.indexOf('.');
          let extension = address_proof.name.substring(ex);
          this.fd.append('address_proof', address_proof, this.identifier+'address_proof'+extension);
          break;
        }
        default : {
          console.log("Invalid Case");
        }
      }  
    }
  }

  upload () {
    this.fd.append("identifier",String(this.identifier));
    const headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // headers.append('Accept', 'application/json');
    console.log(this.fd);
    this.http.post("http://13.234.109.247:3000/api/uploader", this.fd)
    .subscribe(res => {
      console.log(res);
      alert("Files uploaded successfully");
      this.formDataService.updates(5);
      
    });
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
      content.set('identifier', String(this.identifier));
      this.http.post("http://13.234.109.247:3000/api/submitForm", content.toString(), { headers: headers })
      .subscribe (
        (response: Response) => {
          console.log(response.json());
          alert("You form has been submitted");
        }
      );
    }
  }

  goTo(form: any, link: string) {
    console.log("goyo");
   
      this.router.navigate(['/starter/' + link, this.identifier, this.editable]);
    
  }


}
