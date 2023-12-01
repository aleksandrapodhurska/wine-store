import { UserData } from 'src/app/model/token';
import { AuthenticationService } from './../../../authentication/services/authentication.service';
import { ProductsService } from './../../services/products.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  added:boolean = false;

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _authService: AuthenticationService
  ) {
    
   }

  @Input()
  product:Product | undefined



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.added = false
  }


  addItemToCart(id: string) {
    this._cartService.addItemToCart(id);
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 3000)
  }
}
