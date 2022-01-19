import { Component } from '@angular/core';
import {ShopingCartService} from 'src/app/shared/services/shopping-card.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  total$ = this.shoppingCartSvc.totalAction$
  cart$ = this.shoppingCartSvc.cartAction$

  constructor(private shoppingCartSvc: ShopingCartService) { }

}
