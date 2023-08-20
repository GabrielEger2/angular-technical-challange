import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

const headers = new HttpHeaders({
  'Authorization': 'Bearer d4777b73dbfeec433c39d9694f0966bd39352ebbdf96c6bbb55dc06e73b52abd'
});

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrl = 'https://gorest.co.in/public/v2';

  constructor(private http: HttpClient) { }

  mapUserForApi(user: UserModel): any {
    const apiUser = {
      email: user.email,
      gender: user.gender === 'Masculino' ? 'male' : 'female',
      name: user.name,
      status: user.status ? 'active' : 'inactive'
    };

    return apiUser;
  }

  fetchUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  createUser(user: UserModel): Observable<any> {
    const mappedUser = this.mapUserForApi(user);

    return this.http.post(`${this.apiUrl}/users`, mappedUser, { headers });
  }

  updateUser(id: any, user: UserModel): Observable<any>{
    const mappedUser = this.mapUserForApi(user);

    return this.http.put(`${this.apiUrl}/users/`.concat(id), mappedUser, { headers });
  }

  deleteUser(id: any){
    return this.http.delete(`${this.apiUrl}/users/`.concat(id), { headers });
  }
}