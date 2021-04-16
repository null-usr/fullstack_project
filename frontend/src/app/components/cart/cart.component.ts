import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:[Product, number][];

  fullname: string = '';
  address: string = '';
  creditcard: string = '';

  //this should change and update
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public cart: CartService) 
    {
      this.products = cart.getItems(); 
    }

  ngOnInit(): void {
    this.calculateTotal();
  }

  getAmount(p: Product): number
  {
    let result = this.products.filter(obj => {
      return obj[0].id == p.id;
    });

    return result[0][1];
  }

  calculateTotal(): void
  {
    this.totalPrice = 0;
    this.products.forEach( (item, index) =>
    {
      this.totalPrice += (item[0].price * item[1]);
    });
  }

  //this is called when the amount of a cart item has been modified
  updateAmount(data: [Product, number])
  {
    //simply filter and recalculate
    if(data[1] === 0)
    {
      this.products = this.products.filter( p => p[0].id !== data[0].id);
      this.cart.products = this.products;
      this.calculateTotal();
      window.alert(`${data[0].name} removed from cart!`);
    }
    else
    {
      let product = this.products.filter( p => p[0].id === data[0].id)[0];
      product[1] = data[1];
      this.cart.products = this.products;
      this.calculateTotal();
    }
  }

  submitForm(): void {
    this.cart.owner = this.fullname;
    this.cart.total = this.totalPrice;
    this.cart.clear();
    
    this.router.navigate(['/confirmation']);
  }

}
