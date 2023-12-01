import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/model/cart-item';
import { UserData } from 'src/app/model/token';
import { UserPurchaseInfo } from 'src/app/model/user';
import { CartService } from 'src/app/pages/main/services/cart.service';
import { OrderService } from 'src/app/pages/order/services/order.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  @Input() screenWidth: number;
  display: boolean = false;

  userData$: Observable<UserData>;
  userPurchaseInfo$: Observable<UserPurchaseInfo>;
  cart$: Observable<Cart>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  newUser: boolean = false;
  hasOpenCart: boolean = false;
  hasNoOpenCart: boolean = false;
  cartDetails = {
    cartCreated: '',
    subtotal: 0,
  };
  lastOrderDate = '';

  header: string = '';
  buttonValue: string = '';

  allowed = false;

  constructor(
    private _authService: AuthenticationService,
    private _cartService: CartService,
    private _orderService: OrderService,
    public _router: Router
  ) {
    this.userData$ = this._authService.userData$;
    this.cart$ = this._cartService.cart$;
    this.userPurchaseInfo$ = this._authService.userPurchaseInfo$;
    // this._cartService.getCart();
  }

  ngOnInit(): void {
    this.userData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data) {
          if(data.user.role !== 'admin') {
            if (data.newUser) {
              this.evaluateUser(data);
            }
            this.userPurchaseInfo$.subscribe(data => {
              if (data) {
                setTimeout(() => {
                  this.cart$.pipe(takeUntil(this.destroyed$)).subscribe((cart) => {
                    this.evaluateUser(data, cart);
                  });
                }, 500)
              }
            })
          } else {
            this.greetAdmin();
          }
          
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  evaluateUser(data: any, cart: any = null) {
    let userInfo: any = data[0];

    if (data.newUser) {
      this.newUser = true;
      this.header = 'We are happy you joined our service!';
      this.buttonValue = 'Start shopping';
    } else if (userInfo.cart) {
      this.hasOpenCart = true;
      this.header = 'Nice to see you back!';
      this.cartDetails = {
        cartCreated: cart.createdAt,
        subtotal: cart.subtotal,
      };
      this.buttonValue = 'Resume to shopping';
    } else if (!userInfo.cart && userInfo.orders) {
      this.hasNoOpenCart = true;
      this.header = 'Happy you are back!';
      this.buttonValue = 'Start shopping';
      this._orderService.getLastOrderDate(userInfo._id).subscribe((date) => {
        this.lastOrderDate = date;
      });
    }
    this.allowed = true;
  }

  greetAdmin(){
    this.header = 'Hi Admin!';
    this.buttonValue = 'Review products';
  }

  shop() {
    this._router.navigateByUrl('/shop');
  }
}