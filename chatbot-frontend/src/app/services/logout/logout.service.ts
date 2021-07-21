import { UserDataService } from './../user-data/user-data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  baseURL: string = "http://localhost:3000/";
  userURL: string = "users/logout";

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }
  // Function to logout user
  async logout() {
    const token = this.userDataService.token;
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
    try {
      const promise = await this.http.post(this.baseURL + this.userURL, {}, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };

  }
}
