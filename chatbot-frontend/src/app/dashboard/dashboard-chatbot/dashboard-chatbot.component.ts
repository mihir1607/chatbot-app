import { Component, OnInit } from '@angular/core';

import { ChatsService } from '../../services/chats/chats.service';

@Component({
  selector: 'app-dashboard-chatbot',
  templateUrl: './dashboard-chatbot.component.html',
  styleUrls: ['./dashboard-chatbot.component.css']
})
export class DashboardChatbotComponent implements OnInit {

  interactions: any[] = [];
  
  query: string = '';

  constructor(
    private chatsService: ChatsService,
    ) { }

  ngOnInit() {
    this.displayMessages();
  }

  async displayMessages() {
    await this.chatsService.getMessages()
    .then((data) => {
      data.forEach((msg: any) => {
        const sentences = msg.chat.split("\n");
        msg.reply = sentences;
        this.interactions.push(msg);
      });
    });
  }

  async addMessage() {
    if (this.query) {
      const u_m = {
        sender: 'user',
        chat: this.query,
      };
      const b_m = {
        sender: 'bot',
        reply: ['typing...']
      };
      let message = this.query;
      this.query = '';
      this.interactions.push(u_m);
      this.interactions.push(b_m);
      await this.chatsService.sendNewMsg(message)
      .then((data) => {
        this.interactions.pop();
        this.interactions.pop();
        data.forEach((msg: any) => {
          const sentences = msg.chat.split("\n");
          msg.reply = sentences;
          this.interactions.push(msg)
        });
      });
    }
  }

}
