import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http) { }
  public url: string = "http://localhost:3000/api/userList/";
  public users : any[];
  ngOnInit() {
    var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.get(this.url, { headers: headers })
        .subscribe (
          (response: Response) => {
            console.log(response.json());
            let resp = response.json();
            this.users = resp.users;

          }
        );
  }

}
