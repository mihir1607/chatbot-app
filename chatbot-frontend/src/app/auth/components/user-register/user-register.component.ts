import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegister } from '../../../interface/user-register';

import { UserSignUpService } from '../../../services/registration/user-sign-up.service';
import { UserDataService } from '../../../services/user-data/user-data.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: UserRegister = {
    'username': '',
    'email': '',
    'password': '',
  };

  success: boolean = false;
  repeatPassword: string = '';
  message: string = '';

  constructor(
    private userSignUpService: UserSignUpService,
    private userDataService: UserDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  // Function to clear all fields on the page
  clearFields() {
    this.user.username = '';
    this.user.email = '';
    this.user.password = '';
    this.repeatPassword = '';
  }
  // Function to send registration request to UserSignUp service
  async addUser() {
    if (this.user.username && this.user.email && this.user.password) {
      if (this.user.password === this.repeatPassword) {
        await this.userSignUpService.addUser(this.user)
        .then((data: any) => {
          this.userDataService.name = data.user.username;
          this.userDataService.mail = data.user.email;
          this.userDataService.address = data.user.address;
          this.userDataService.token = data.token;
          this.router.navigate(['/dashboard']);
        });
        this.clearFields();
      }
      else {
        alert('Passwords do not match. Please try again');
      }
    } else {
      alert('One or more fields are empty.');
    }
  }

}
