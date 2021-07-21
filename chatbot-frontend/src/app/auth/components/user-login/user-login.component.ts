import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogin } from '../../../interface/user-login';

import { UserLoginService } from '../../../services/login/user-login.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: UserLogin = {
    'email': '',
    'password': '',
  };

  constructor(
    private userLoginService: UserLoginService,
    private userDataService: UserDataService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  // Function to send details to UserLoginService and ask for login permission

  async loginUser() {
    if (this.user.email && this.user.password) {
      await this.userLoginService.loginUser(this.user)
      .then((data: any) => {
        this.userDataService.name = data.user.username;
        this.userDataService.mail = data.user.email;
        this.userDataService.address = data.user.address;
        this.userDataService.token = data.token;
        this.router.navigate(['/dashboard']);
      });
    } else {
      alert('One or more fields are empty.');
    }
  }
  // Function to clear all fields on the page
  clearFields() {
    this.user.email = '';
    this.user.password = '';
  }

}
