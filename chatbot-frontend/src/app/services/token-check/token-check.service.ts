import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService {
  baseURL: string = "http://localhost:3000/";
  userURL: string = "users/me";

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
    ) { }

  async verifyToken() {
    const token = this.userDataService.token;
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
    try {
      const promise = await this.http.get(this.baseURL + this.userURL, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }

}
