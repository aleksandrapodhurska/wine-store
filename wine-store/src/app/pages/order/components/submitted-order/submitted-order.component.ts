import { OrderService } from 'src/app/pages/order/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submitted-order',
  templateUrl: './submitted-order.component.html',
  styleUrls: ['./submitted-order.component.scss']
})
export class SubmittedOrderComponent implements OnInit {

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  returnToShop() {
    this._orderService.returnToShop();
  }
}
