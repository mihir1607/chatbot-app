import { Injectable } from '@angular/core';

import { Message } from '../../interface/message';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  username: string = '';
  email: string = '';
  jsonToken: string = '';
  address: string = '';
  chatbot: Message[] = [];

  constructor() { }

  set name(value: string) {
    this.username = value;
  }

  set mail(value: string) {
    this.email = value;
  }

  set token(value: string) {
    this.jsonToken = value;
  }

  set chatMessages(value: Message[]) {
    this.chatbot = value;
  }

  set curr_address(value: string) {
    this.address = value;
  }

  get name(): string{
    return this.username;
  }

  get mail(): string {
    return this.email;
  }

  get token(): string {
    return this.jsonToken;
  }

  get chatMessages(): Message[] {
    return this.chatbot;
  }

  get curr_address(): string {
    return this.address;
  }
}
