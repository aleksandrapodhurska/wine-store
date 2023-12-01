import { Router } from '@angular/router';
import { CartService } from 'src/app/pages/main/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeliverySlot, Order } from 'src/app/model/order-item';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = `${environment.apiUrl}/order`;

  lastOrderDate$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  deliverySlots$: BehaviorSubject<DeliverySlot[]> = new BehaviorSubject<DeliverySlot[]>([]);
  cart:any;
  orderSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
    private _cartService: CartService,
    private _router: Router
  ) { 
    this.getDeliverySlots();
  }

  getDeliverySlots() {
    const url = environment.production ? '' : this.baseUrl + "/deliverySlots";
    return this._http.get<DeliverySlot[]>(url).subscribe(success => {
      this.deliverySlots$.next(success);
    });
  }

  createOrder(payload: Order) {
    const url = environment.production ? '' : this.baseUrl;
    return this._http.post<Order>(url, payload).subscribe(success => {
      this.orderSubmitted$.next(true);
      this._cartService.cart$.next(null);
      this._cartService.cartItems$.next([]);
    });
    
  }

  getLastOrderDate(owner: string) {
    const url = environment.production ? '' : `${this.baseUrl}/${owner}`;
    return this._http.get<string>(url);
  }

  returnToShop() {
    this.orderSubmitted$.next(false);
    this._router.navigateByUrl('/shop');
  }
}
