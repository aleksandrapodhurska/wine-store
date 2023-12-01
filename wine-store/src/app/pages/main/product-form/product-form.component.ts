import { Product } from 'src/app/model/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  products: Product[] = [];

  constructor(
    private _productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this._productsService.products$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.products = data;
    });

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  openNew() {
    this._productsService.showProductFormEventEmitter.emit();
  }

  editProduct(product: Product) {
    this._productsService.showProductFormEventEmitter.emit(product);
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${product.name}?`,
      accept: () => {
        this._productsService.deleteProduct(product._id);

        this.messageService.add({
          severity: 'info',
          summary: 'Product Deleted',
          detail: product.name,
        });
      },
  });
    
  }  

}
