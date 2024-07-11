import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { io } from 'socket.io-client';

export interface LoginUser {
  username: string | null,
  password: string | null,
}

export interface RegisterUserModel {
  username: string | null,
  password: string | null,
  isAdmin: boolean
}

export interface ResponseModel {
  status: number,
  data: any,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly API_BASE_URL: string = 'https://ancient-sands-50709-d78d7a043df6.herokuapp.com';

  constructor(private http: HttpClient) { }

  public authenticateUser(body: LoginUser) {
    return this.http.post(`${this.API_BASE_URL}/auth/login`, body)
  }

  public registerUser(body: RegisterUserModel) {
    return this.http.post(`${this.API_BASE_URL}/auth/register`, body);
  }
  
}
