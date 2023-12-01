import { Product } from './../../../../model/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public products$: Observable<Product[]>;
  public loading$: Observable<boolean>;
  product$: any;
  public categories$;
  startingCategory: any;

  sortOrder: number;

  sortField: string;

  num: number = 1;

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {
    this.categories$ = this._productsService.categories$;
  }

  ngOnInit(): void {
    this.startingCategory = this.categories$;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  getProducts() {
    this.products$ = this._productsService.products$;
  }

  getProduct(id: string) {
    this._productsService.getProduct(id).pipe(takeUntil(this.destroyed$)).subscribe(
      (success) => {
        this.product$ = success;
      },
      (error) => {}
    );
  }

  addItemToCart(id: string) {
    this._cartService.addItemToCart(id, this.num);
  }
}
