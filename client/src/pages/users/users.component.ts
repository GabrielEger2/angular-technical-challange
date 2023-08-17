import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  public users: any[] = []; // Array to store fetched users

  constructor(private http: HttpClient) {
    http.get<any[]>('https://gorest.co.in/public/v2/users')
      .subscribe(res => {
        this.users = res;
      })
  }
}