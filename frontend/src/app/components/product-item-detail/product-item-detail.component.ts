//https://angular-2-training-book.rangle.io/routing/routeparams
//https://angular.io/guide/router

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Product } from '../../../models/product';


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  id: number;
  amount: number;
  product: Product;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private cart: CartService) 
  { 
    this.id = -1; 
    this.amount = 1;
    this.product = {
      name: '',
      id: -1,
      price: 0,
      url: '',
      description: '',
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>  {
      this.id = params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });

    this.cart.getProducts().subscribe(res => {
      //may need to add a quantity property
      let result = res.filter(obj => {
        return obj.id == this.id;
      });

      if(result.length !== 0)
      {
        this.product = result[0];
      }
      else
      {
        this.router.navigate(['/']);
      }
    });
  }

  addToCart(p: Product, num: number)
  {
    if(num > 0)
    {
      this.cart.addToCart(p, this.amount);
      window.alert(`${num} ${p.name}(s) added to cart!`);

      //reset the amount
      this.amount = 1;
    }
    else
    {
      window.alert(`Can't order${num} ${p.name}(s)!`);
    }
  }

}
