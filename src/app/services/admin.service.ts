import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly API_BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    const url = `${this.API_BASE_URL}/auth/users`;
    return this.http.get(url);
  }

}
