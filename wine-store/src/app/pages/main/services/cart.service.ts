import { Cart } from './../../../model/cart-item';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string = `${environment.apiUrl}/cart`;

  user: any;
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  cartItems$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {
    this._authService.userData$.pipe().subscribe((data) => {
      if (data) {
        this.user = data.user;
        if (this.user.role !== 'admin'){
          setTimeout(() => {
            this.getCart();

          }, 1500)
        }
      }
    });
  }

  getCart() {
    const url = environment.production ? '' : `${this.baseUrl}/${this.user.id}`;
    this._http.get<Cart>(url).subscribe((cart) => {
      if (!cart) {
        this.cart$.next(null);
      } else {
        this.cart$.next(cart);
        this.cartItems$.next(cart.items);
      }
    });
  }

  addItemToCart(id: string, quantity: number = 1) {
    const product = {
      userId: this.user.id,
      productId: id,
      quantity,
    };
    const url = environment.production ? '' : `${this.baseUrl}`;
    this._http.post<Cart>(url, product).subscribe((cart) => {
      this.cart$.next(cart);
      this.cartItems$.next(cart.items);
    });
  }

  removeCartItem(
    productId: string,
    cartId: string = this.cart$.getValue()._id
  ) {
    const url = environment.production ? '' : `${this.baseUrl}`;
    return this._http.put<Cart>(url, { cartId, productId }).subscribe(success => {
      this.getCart();
    });
  }

  emptyCart(cartId: string = this.cart$.getValue()._id) {
    const url = environment.production ? '' : `${this.baseUrl}/empty`;
    return this._http.put<Cart>(url, {cartId}).subscribe(success => {
      this.getCart();
    });
  }

  deleteCart(cartId: string, userId: string) {
    const url = environment.production ? '' : this.baseUrl;
    const options = { body: { cartId, userId } };
    return this._http.delete(url, options);
  }

  editCartItem(productId: string, quantity: number) {
    const cartId = this.cart$.getValue()._id;
    const url = environment.production ? '' : `${this.baseUrl}/edit`;
    const options = { body: { cartId, productId, quantity } };
    return this._http.put<Cart>(url, options);
  }

  proceedToOrder() {
    this._router.navigateByUrl('/order');
  }
}
