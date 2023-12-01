import { AuthenticationService } from './../../../authentication/services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/pages/main/services/cart.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  cart:any;
  userPurchaseInfo: any;
  cartItems$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  subtotal:number = 0;

  exportColumns = [
    {title: 'Name', dataKey: 'name'},
    {title: 'Price', dataKey: 'price'},
    {title: 'Quantity', dataKey: 'quantity'},
    {title: 'Total', dataKey: 'total'},
  ];

  header: any;
  body: any;
  footer: any;

  constructor(
    private _cartService: CartService,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this._cartService.cart$.pipe(takeUntil(this.destroyed$)).subscribe(cart => {
      this.cart = cart;
      this.subtotal = cart.subtotal;
      this.body = cart.items.map(item => {
        return {
          name: item.productId.name,
          price: item.price,
          quantity: item.quantity,
          total: item.total
        }
      });
      this._authService.userPurchaseInfo$.pipe(takeUntil(this.destroyed$)).subscribe(success => {
        this.userPurchaseInfo = success;
        this.userPurchaseInfo = this.userPurchaseInfo[0];
      })
    })   

    this.header = `Order: ${this.cart._id}
    Customer: ${this.userPurchaseInfo.firstName} ${this.userPurchaseInfo.familyName}
    Delivery: ${this.userPurchaseInfo.address.city} ${this.userPurchaseInfo.address.street}`;
    this.footer = `Subtotal: $${this.cart.subtotal}`
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  exportPdf() {
    let doc = new jsPDF('p', 'pt');
    let pageSize = doc.internal.pageSize;
    let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    doc.setFontSize(12);
    doc.setFont('helvetica');
    let text = doc.splitTextToSize(this.header, pageWidth - 35, {});
    doc.text(text, 35, 35);
    autoTable(doc, {
      columns: this.exportColumns,
      body: this.body,
      startY: 90,
      useCss: true,
      theme: "striped",
      styles: {
        font: "helvetica",
        fontSize: 10,
        halign: 'center',
        valign: 'middle',
      },
    })
    let subtotal = doc.splitTextToSize(this.footer, pageWidth - 35, {});
    doc.text(subtotal, 35, pageSize.getHeight() - 55);
    doc.setFontSize(12);
    doc.setFont('helvetica');

    doc.save(`order_ ${this.cart._id}.pdf`);
    }

}