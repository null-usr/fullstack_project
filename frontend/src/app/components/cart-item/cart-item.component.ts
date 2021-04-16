import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Input() amount:number;

  @Output() updateAmount: EventEmitter<[Product, number]> = new EventEmitter;

  constructor() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      url: ''
    };

    this.amount = 0;
   }

  ngOnInit(): void {
  }

  //so this will either recalculate the total price
  //or remove this item from the cart
  updateCartAmount(data:[Product, number]): void
  {
    this.updateAmount.emit(data);
  }

  removeFromCart(data:Product):void
  {
    this.updateAmount.emit([data, 0]);
  }

}
