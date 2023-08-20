import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { postModel } from './post.model';

const headers = new HttpHeaders({
  'Authorization': 'Bearer d4777b73dbfeec433c39d9694f0966bd39352ebbdf96c6bbb55dc06e73b52abd'
});

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private apiUrl = 'https://gorest.co.in/public/v2';

  constructor(private http: HttpClient) { }

  fetchPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`, { headers });
  }

  createPost(userID: any, post: postModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`.concat(userID).concat('/posts'), post, { headers });
  }

  updatePost(id: any, post: postModel): Observable<any>{
    return this.http.patch(`${this.apiUrl}/posts/`.concat(id), post, { headers });
  }

  deletePost(id: any){
    return this.http.delete(`${this.apiUrl}/posts/`.concat(id), { headers });
  }
}