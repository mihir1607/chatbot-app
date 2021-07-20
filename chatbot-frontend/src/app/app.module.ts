import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth/auth.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './start/welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard/dashboard/dashboard-routing.module';
import { DashboardModule } from './dashboard/dashboard/dashboard.module';
import { DashboardChatbotComponent } from './dashboard/dashboard-chatbot/dashboard-chatbot.component';
import { DashboardManualComponent } from './dashboard/dashboard-manual/dashboard-manual.component';
import { DashboardProductsComponent } from './dashboard/dashboard-products/dashboard-products.component';
import { DashboardAboutUsComponent } from './dashboard/dashboard-about-us/dashboard-about-us.component';
import { DashboardDetailsComponent } from './dashboard/dashboard-details/dashboard-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    DashboardComponent,
    DashboardHomeComponent,
    DashboardChatbotComponent,
    DashboardManualComponent,
    DashboardProductsComponent,
    DashboardAboutUsComponent,
    DashboardDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    DashboardModule,
    DashboardRoutingModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
