import { CartService } from './../../services/cart.service';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart, CartItem } from 'src/app/model/cart-item';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService],
})
export class CartComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public cart$: Observable<Cart>;
  cartItems$: Observable<CartItem[]>;

  num: number = 1;

  buttonVisible: boolean = false;
  quantityVisible: boolean = true;

  subtotal:number = 0;

  menuItems: MenuItem[];
  selectedItem: any;
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private messageService: MessageService
  ) {
    this.cart$ = this._cartService.cart$;
    this.cartItems$ = this._cartService.cartItems$;
    this.cart$.pipe(takeUntil(this.destroyed$)).subscribe(success => {
      this.subtotal = success.subtotal;
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  saveChanges() {
    this._cartService.editCartItem(
      this.selectedItem.productId._id,
      this.selectedItem.quantity
    ).pipe(takeUntil(this.destroyed$)).subscribe(success => {
      this._cartService.getCart();
      this.selectedItem = null;
      this.messageService.add({
        severity: 'success',
        summary: 'Product qunatity has been changed',
        detail: this.selectedItem.productId.name,
      });
    });


  }

  deleteProduct(cartItem: any) {
    this._cartService.removeCartItem(cartItem.productId._id);

    this.messageService.add({
      severity: 'info',
      summary: 'Product Deleted',
      detail: cartItem.productId.name,
    });
    this.selectedItem = null;
  }

  emptyCart() {
    this._cartService.emptyCart();
    this.messageService.add({
      severity: 'info',
      summary: 'Cart has been emptied'
    });
  }

  proceedToOrder() {
    this._router.navigateByUrl('/order');
  }

  onRowSelect(item: any) {
    this.buttonVisible = true;
    this.selectedItem = item.data;
  }

  onRowUnselect(event: any) {
    this.buttonVisible = false;
    this.selectedItem = null;
  }

  
}
