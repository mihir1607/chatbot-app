import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TokenCheckService } from 'src/app/services/token-check/token-check.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private tokenCheckService: TokenCheckService,
    private router: Router
    ) { }

  ngOnInit() {
  }

}
