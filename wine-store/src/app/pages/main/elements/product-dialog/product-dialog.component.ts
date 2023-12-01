import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsService } from '../../services/products.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { of, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductDialogComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  display: boolean = false;

  form: FormGroup;

  productDialog: boolean;
  product: Product;
  selectedProduct: Product;
  isNewProduct:boolean = true;
  emptyProduct = {
    name: '',
    category: '',
    subcategory: '',
    image: '',
    price: 0,
    unit: '',
    description: '',
    shortDescription: '',
    stock: 0,
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      subcategory: [null, Validators.required],
      shortDescription: [null, Validators.required],
      description: [null, Validators.required],
      unit: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
    })

    this._productsService.showProductFormEventEmitter.pipe(takeUntil(this.destroyed$)).subscribe((success) => {
      this.handleFromShowEvent(success);
      
      this.display = true;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  handleFromShowEvent(product: any){
    this.selectedProduct = product;
    if (product) {
      this.isNewProduct = false;
      this.form.patchValue(product);
    } else {
      this.isNewProduct = true;
      this.form.reset();
    }
  }

  saveProduct() {
    const payload = this.form.getRawValue();
    if (this.isNewProduct) {
      this._productsService.createProduct(payload).pipe(takeUntil(this.destroyed$)).subscribe((success) => {
        this._productsService.getProducts();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product added', life: 3000})
      });setTimeout(() => {
        this.display = false;
        }, 1000)

    } else {
      payload._id = this.selectedProduct._id;
      this._productsService.editProduct(payload).pipe(takeUntil(this.destroyed$)).subscribe(success => {
        this._productsService.getProducts();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product updated', life: 3000})
        setTimeout(() => {
          this.display = false;
        }, 1000);
      });
    }
      this._productsService.getProducts();
      this.productDialog = false;
      this.isNewProduct = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.isNewProduct = true;
  }

}
