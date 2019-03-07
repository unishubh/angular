import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-list-co',
  templateUrl: './list-co.component.html',
  styleUrls: ['./list-co.component.css']
})
export class ListCoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http) { }
  public type: String;
  public level :string;
  public current_level : Number;
  public token = localStorage.getItem('token');
  public url: string = "http://localhost:3000/api/list/";
  public array :any[];
  public isEmail : boolean = false;
  public isName : boolean = false;
  public isReject : boolean = false;

  ngOnInit() {
    this.current_level = +localStorage.getItem('level');
    this.isEmail = false;
    this.isName = false;
    this.isReject = false;
    this.route.params.subscribe(
      params => {
        let type = params["type"];
        this.type =type;
        if(this.type =="3")
        {
          console.log("converting");
          this.isName = false;
          this.isEmail = true;
        }
        else {
          this.isEmail = false;
          this.isName = true;
        }

        if(this.type == "0" && (this.current_level == 6)) {
          this.isReject = true;
        }

        this.level = params["level"];
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        let content = new URLSearchParams();
        content.set('type', type);
        content.set('level', this.level);
        this.http.post(this.url, content.toString(),{ headers: headers })
          .subscribe(
            (response: Response) => {
              console.log(response.json());
              let resp = response.json();
              this.array = resp.details;
              console.log(this.array);

            }
          );


      }
    );
  }
  

}
