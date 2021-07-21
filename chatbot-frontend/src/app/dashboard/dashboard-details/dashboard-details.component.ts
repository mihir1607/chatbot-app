import { UpdateService } from './../../services/update/update.service';
import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {

  name: string;
  mail: string;
  address: string;
  password: string = '';
  repeatPassword: string = '';

  constructor(
    private userDataService: UserDataService,
    private updateService: UpdateService
  ) {
    this.name = this.userDataService.name;
    this.mail = this.userDataService.mail;
    this.address = this.userDataService.curr_address;    
  }

  ngOnInit(): void {
  }
  // Function to update username
  async updateName() {
    if (this.name) {
      await this.updateService.updateField({username: this.name})
      .then((data) => this.userDataService.name = data.name);
      alert('Username updated successfully. Changes will be reflected the next time you login.');
    } else {
      alert('Username is empty');
    }
  }
  // Function to update address
  async updateAddress() {
    if (this.address) {
      await this.updateService.updateField({address: this.address})
      .then((data) => this.userDataService.curr_address = data.address);
      alert('Address updated successfully');
    } else {
      alert('Address is empty');
    }
  }
  // Function to update password
  async updatePassword() {

    if (this.password && this.repeatPassword) {
      if (this.password === this.repeatPassword) {
        await this.updateService.updateField({password: this.password});
        this.password = '';
        this.repeatPassword = '';
        alert('Password changed successfully');
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Both of the password fields must be entered');
    }
    
  }

}
