import { Category } from './../../../../model/category';
import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap, map, BehaviorSubject, ReplaySubject, takeUntil } from 'rxjs';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public categories$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  items: MenuItem[] = [];
  activeItem: MenuItem;

  constructor(
    private _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._productsService.getCategories().pipe(takeUntil(this.destroyed$)).subscribe((items) => {
      this.categories$.next(items);
        items.map((item, i) => {
          this.items.push({
            label: item,
            command: (event: any) => this.getProductsByCategory(event.item),
          })
        })
        this.activeItem = this.items[0];
        this.getProductsByCategory(this.items[0])
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getProductsByCategory(category: MenuItem) {
    this._productsService.getProductsByCategory(category)
  }

}