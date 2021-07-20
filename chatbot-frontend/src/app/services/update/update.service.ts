import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  baseURL: string = "http://localhost:3000/";
  updateURL: string = "users/me";

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }

    async updateField(obj: any) {
      const token = this.userDataService.token;
      const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
      const body = JSON.stringify(obj);
      console.log(body);
      try {
        const promise = await this.http.patch(this.baseURL + this.updateURL, body, {'headers': headers}).toPromise();
        return promise;
      } catch (error) {
        return error;
      }
    }

}
