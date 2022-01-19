import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShopingCartService } from 'src/app/shared/services/shopping-card.service';
import { Product } from './interfaces/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productsSvc: ProductService, private shopingCartSvc: ShopingCartService) { }

  ngOnInit(): void {
    this.productsSvc.getProducts()
      .pipe(
        tap((products:Product[]) => this.products = products)
      )
      .subscribe()
    
  }

  addToCart(product:Product): void {
    console.log('El producto a agregar es', product)
    this.shopingCartSvc.updateCart(product)
  }

}
