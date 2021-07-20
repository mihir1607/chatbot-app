import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserRegister } from '../../interface/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserSignUpService {
  baseUrl: string = "http://localhost:3000/";
  registerURL: string = 'users';

  constructor(private http: HttpClient) { }
  
  async addUser(user: UserRegister) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    console.log(body);
    try {
      const promise = await this.http.post(this.baseUrl + this.registerURL, body, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }
}