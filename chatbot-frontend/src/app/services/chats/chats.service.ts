import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from '../../interface/message';

import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  baseURL: string = 'http://localhost:3000/';
  chatsURL: string = 'chats';
  chats: Message[] = [];

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }

  async getMessages() {
    const token = this.userDataService.token;
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
    try {
      const promise = await this.http.get(this.baseURL + this.chatsURL, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }

  async sendNewMsg(msg: string) {
    const token = this.userDataService.token;
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('authorization', 'Bearer ' + token);
    const newMessage: any = {
      'chat': msg
    };
    const body = JSON.stringify(newMessage);
    try {
      const promise = await this.http.post(this.baseURL + this.chatsURL, body, {'headers': headers}).toPromise();
      return promise;
    } catch (error) {
      return error;
    };
  }
}
