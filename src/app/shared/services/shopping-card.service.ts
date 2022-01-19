import { Injectable} from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Product } from 'src/app/pages/products/interfaces/product.interface'

@Injectable({
   providedIn:'root'
})

export class ShopingCartService {
   
   products: Product[] = []
   
   private cartSubject = new BehaviorSubject<Product[]>([])
   private totalSubject = new BehaviorSubject<any>(null)
   private quantitySubject = new BehaviorSubject<any>(null)

   get cartAction$(): Observable<Product[]>{
      return this.cartSubject.asObservable();
   }

   get totalAction$(): Observable<number>{
      return this.totalSubject.asObservable();
   }

   get quantityAction$(): Observable<number>{
      return this.quantitySubject.asObservable();
   }

   updateCart(product: Product): void {
      this.addToCart(product);
      this.quantityProducts();
      this.calcTotal()
   }

   resetCart():void{
      this.cartSubject.next([])
      this.totalSubject.next(null)
      this.quantitySubject.next(null)
   }

   private addToCart(product:Product): void {
      const isProductInCart = this.products.find(({id}) => id == product.id)

      if(isProductInCart){
         isProductInCart.quantity += 1;
      }else{
         this.products.push({...product,quantity:1})
      }
      console.log(this.products)
      this.cartSubject.next(this.products)
   }
   
   private quantityProducts(): void {
      const quantity = this.products.reduce((acc,prod) => acc += (prod.quantity),0)
      this.quantitySubject.next(quantity)
   }
   
   private calcTotal(): void {
      const total = this.products.reduce((acc,prod) => acc += (prod.price*prod.quantity),0)
      this.totalSubject.next(total)
   }

}