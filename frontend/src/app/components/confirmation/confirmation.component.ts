import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  name: string = '';
  price: number = 0;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.name = this.cart.getOwner();
    this.price = this.cart.getTotal();
  }

}
