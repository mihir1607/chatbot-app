import { Component, OnInit } from '@angular/core';

import { GetProductsService } from './../../services/get-products/get-products.service';

import { Product } from '../../interface/product';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private getProductsService: GetProductsService
    ) { }

  ngOnInit() {
    this.displayProducts();
  }

  displayProducts(): void {
    this.getProductsService.getProducts().then((data) => {
      this.products = data;
    });
  }

}