import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserLogin } from '../../interface/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  baseURL: string = "http://localhost:3000/";
  loginURL: string = "users/login";

  constructor(
    private http: HttpClient,
    ) { }

  loginUser(user: UserLogin) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    try {
      const promise = this.http.post(this.baseURL + this.loginURL, body, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }
}