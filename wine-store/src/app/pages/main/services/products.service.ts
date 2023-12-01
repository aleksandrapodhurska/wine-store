import { Product } from './../../../model/product';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {MenuItem} from 'primeng/api';
import { UserData } from 'src/app/model/token';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  public categories$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private baseUrl: string = `${environment.apiUrl}/products`;
  private products: Product[] = [];
  userData$: Observable<UserData>;
  showProductFormEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
    ) {
      this.userData$ = this._authService.userData$;
      this.userData$.subscribe(userData => {
        setTimeout(() => {
        if (userData.user.role !== 'admin') {
            this.getCategories();
            
          } else {
            this.getProducts();
          }
        }, 1500)
    })
  }

  validateUser() {
    this.userData$.subscribe(userData => {
        if (userData.user.role !== 'admin') {
          setTimeout(() => {
            this.getCategories();
          }, 1500)

      } else {
        this.getProducts();
      }
    })
  }


  getCategories(): Observable<string[]> {
    const url = environment.production ? '' : `${this.baseUrl}/categories`;
    return this._http.get<string[]>(url);
  }

  getProducts() {
    const url = environment.production ? '' : this.baseUrl;
    this._http.get<Product[]>(url).subscribe((products) => {
      this.products = products;
      this.products$.next(products);
    });
  }

  getProductsByCategory(category: MenuItem) {
    let params = category.label.replace(/ /, '%20');
    const url = environment.production ? '' : `${this.baseUrl}/${params}`;
    this._http.get<Product[]>(url).subscribe((products) => {
      this.products = products;
      this.products$.next(products);
    });
  }

  getProduct(id: string) {
    const url = environment.production ? '' : `${this.baseUrl}/single/${id}`;
    return this._http.get<Product>(url);
  }

  createProduct(product: Product) {
    const url = environment.production ? '' : `${this.baseUrl}`;
    return this._http.post<Product>(url, product)
  }

  editProduct(product: any) {
    const url = environment.production ? '' : `${this.baseUrl}/edit/${product._id}`;
    return this._http.put<Product>(url, product);
    //Backend returns a new product obj
  }

  deleteProduct(id: string) {
    const url = environment.production ? '' : `${this.baseUrl}/${id}`;
    return this._http.delete<Product>(url).subscribe(success => {
      this.getProducts();
    });
  }

}
