import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';
import { DashboardChatbotComponent } from '../dashboard-chatbot/dashboard-chatbot.component';
import { DashboardManualComponent } from '../dashboard-manual/dashboard-manual.component';
import { DashboardProductsComponent } from '../dashboard-products/dashboard-products.component';
import { DashboardAboutUsComponent } from '../dashboard-about-us/dashboard-about-us.component';
import { DashboardDetailsComponent } from '../dashboard-details/dashboard-details.component';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: DashboardHomeComponent,
            },
            {
                path: 'chatbot',
                component: DashboardChatbotComponent,
            },
            // {
            //     path: 'user-manual',
            //     component: DashboardManualComponent,
            //     data: { animation: 'manual' }
            // },
            {
                path: 'details',
                component: DashboardDetailsComponent
            },
            {
                path: 'products',
                component: DashboardProductsComponent,
            },
            {
                path: 'about-us',
                component: DashboardAboutUsComponent,
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule { }