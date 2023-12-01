import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/pages/main/services/cart.service';
import { environment } from 'src/environments/environment.prod';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderSubmitted$: Observable<boolean>;
  success: any = false;

  constructor(
    private _orderService: OrderService
  ) { 
    this._orderService.orderSubmitted$.subscribe(result => {
      if (result) {
        this.success = true;
      } else {
        this.success = false;
      }
    })
  }

  ngOnInit(): void {

  }

  
}
