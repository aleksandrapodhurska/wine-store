import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor() { }

  @Input()
  cartItem: CartItem | undefined

  ngOnInit(): void {
    
  }

}
