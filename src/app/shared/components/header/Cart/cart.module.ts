import { Component, OnInit } from "@angular/core";
import { ShopingCartService } from "src/app/shared/services/shopping-card.service";

@Component({
   selector: 'app-cart',
   template: `
      <ng-container *ngIf="{total: total$ | async | currency, quantity: quantity$ | async} as dataCart">   
      <ng-container *ngIf="dataCart.total">
            <mat-icon >shopping_cart</mat-icon>
               {{dataCart.total}}
               ({{dataCart.quantity}})
         </ng-container>
      </ng-container>
   `
})

export class CartComponent {


   quantity$ = this.shoppingCartSvc.quantityAction$
   total$ = this.shoppingCartSvc.totalAction$
   cart$ = this.shoppingCartSvc.cartAction$
   
   constructor(private shoppingCartSvc: ShopingCartService) { }

}