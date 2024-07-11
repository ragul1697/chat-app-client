import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly API_BASE_URL: string = 'https://ancient-sands-50709-d78d7a043df6.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    const url = `${this.API_BASE_URL}/auth/users`;
    return this.http.get(url);
  }

}
