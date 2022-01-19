import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataStoreService } from 'src/app/shared/services/data-stores.service';
import { ShopingCartService } from 'src/app/shared/services/shopping-card.service';
import { Details, Order } from '../products/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }
  
  stores: Store[] = [];
  cart: Product[] = [];
  isDelivery: boolean = true;

  constructor (
    private dataStoresSvc:DataStoreService, 
    private shoppingCartSvc:ShopingCartService,
    private router:Router){}
  
  ngOnInit(): void {
   this.getStores()
   this.getDataCart()
  }

  onPickUpOrDelivery(value:boolean): void{
    this.isDelivery = value
  }

  onSubmit({value:formData}: NgForm): void{ 
    
    console.log(formData);
    

    const data: Order = {
      ...formData,
      date:this.getCurrentlyDate(),
      isDelivery:this.isDelivery
    }
    this.dataStoresSvc.saveOrder(data).pipe(
      switchMap(({id:orderId}) =>{
        const details = this.prepareDetails()
        return this.dataStoresSvc.saveDetailsOrder({details, orderId})
      }),
      tap(() => this.router.navigate(['/checkout/thanks-you-page'])),
      delay(1000),
      tap(()=> this.shoppingCartSvc.resetCart()),
    ).subscribe()
  }

  
  private getCurrentlyDate():string{
    return new Date().toLocaleDateString();
  }
  
  private prepareDetails(): Details[]{
    const details:Details[] = []
    this.cart.forEach((product:Product)=> {
      const {id:productId,name:productName,quantity} = product
      details.push({productId,productName,quantity})
    }
    )
    return details
  }

  private getStores():void{
    this.dataStoresSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores = stores)
    ).subscribe()
  }

  private getDataCart():void{
    this.shoppingCartSvc.cartAction$.pipe(
      tap((products:Product[])=>this.cart = products)
    ).subscribe()
  }

}
