import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

const headers = new HttpHeaders({
  'Authorization': 'Bearer 9194fcdfed97d89830ec71f1a54d9bc845270965a2c940c31062782ee90689d3'
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