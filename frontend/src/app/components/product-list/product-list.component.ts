import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor( private cartService: CartService ) { }

  ngOnInit(): void {
    //this.products = this.productService.getProducts();
    this.cartService.getProducts().subscribe(res => {
      //may need to add a quantity property
      this.products = res;
    })
  }

}
