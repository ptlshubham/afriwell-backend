import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../services/product.service';
import { Productlist } from 'src/app/modals/productlist.model';

@Component({
  selector: 'app-shopping-widgets',
  templateUrl: './shopping-widgets.component.html',
  styleUrls: ['./shopping-widgets.component.sass']
})
export class ShoppingWidgetsComponent implements OnInit {

  products: Productlist[];
  indexProduct: number;
  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  public sidenavMenuItems: Array<any>;

  @Input() shoppingCartsItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    public productService: ProductService
  ) {
    this.getCart();

  }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }

  getCart() {
    this.carttotal = 0;
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        this.shoppingCartsItems = data;
        this.getTotal();
      });
    }
  }
  // Remove cart items
  public removeItem(id) {
    this.cartService.removeCart(id).subscribe((data: any) => {
      this.getCart();
      this.getTotal();
    });
  }

  // Increase Product Quantity
  public increment(data) {

    this.totalItem = data.quantity + 1;
    data.quantity = this.totalItem;
    this.cartService.updateCartDetails(data).subscribe((res: any) => {
      this.getCart();
      this.getTotal();

    });

  }

  // Decrease Product Quantity
  public decrement(data) {
    if (data.quantity == 1) {
      this.totalItem = data.quantity - 1;
      data.quantity = this.totalItem;
      this.removeItem(data.id);
      this.getCart();
    }
    else {
      this.totalItem = data.quantity - 1;
      data.quantity = this.totalItem;
      this.cartService.updateCartDetails(data).subscribe((res: any) => {
        this.getCart();
        this.getTotal();
      });
    }
  }
  // Get Total
  public getTotal() {
    this.qantWith = 0;
    this.carttotal = 0;
    this.shoppingCartsItems.forEach(element => {
      this.qantWith = element.productPrice * element.quantity;
      this.carttotal = this.carttotal + this.qantWith;
    })
  }





}
