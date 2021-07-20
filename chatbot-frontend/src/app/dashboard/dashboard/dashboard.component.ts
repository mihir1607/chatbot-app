import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from '../../animations/animations';

import { TokenCheckService } from '../../services/token-check/token-check.service';
import { LogoutService } from '../../services/logout/logout.service';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideInAnimation]
})
export class DashboardComponent implements OnInit {
  isAuthenticated: boolean = false;
  name: string;

  constructor(
    private tokenCheckService: TokenCheckService,
    private router: Router,
    private logoutService: LogoutService,
    private userDataService: UserDataService
    ) {
      this.name = this.userDataService.name;
    }

  async ngOnInit() {
    await this.checkToken();
    console.log('After check');

    if(!this.isAuthenticated) {
      this.router.navigate(['/user-login']);
      console.log('No token: Dashboard');
    }
  }
  
  async checkToken() {
    await this.tokenCheckService.verifyToken().then((data: any) => {
      this.isAuthenticated = data.value;
    });
  }

  async logoutUser() {
    await this.logoutService.logout().then((data) => {
      this.userDataService.name = '';
      this.userDataService.mail = '';
      this.userDataService.token = '';
      this.userDataService.chatMessages = [];
      this.userDataService.curr_address = '';
      this.router.navigate(['/user-login']);
    });
  }

}
