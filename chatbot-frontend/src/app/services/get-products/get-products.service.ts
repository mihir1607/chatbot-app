import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  baseURL: string = "http://localhost:3000/";
  productsURL: string = "products";

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }

  async getProducts() {
    const token = this.userDataService.token;
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
    try {
      const promise = await this.http.get(this.baseURL + this.productsURL, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }

}