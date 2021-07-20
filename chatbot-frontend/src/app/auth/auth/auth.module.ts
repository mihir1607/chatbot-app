import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { UserLoginComponent } from '../components/user-login/user-login.component';
import { UserRegisterComponent } from '../components/user-register/user-register.component';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,
    AdminLoginComponent,
  ]
})
export class AuthModule { }
