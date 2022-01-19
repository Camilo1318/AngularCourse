import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder, Order } from "src/app/pages/products/interfaces/order.interface";
import { Store } from "../interfaces/store.interface";

@Injectable({
   providedIn:'root'
})

export class DataStoreService{
   apiURL:string = 'http://localhost:3000'

   constructor(private http:HttpClient){}

   //Obiente el listado de tiendas para el formulario select
   getStores():Observable<Store[]>{
      return this.http.get<Store[]>(`${this.apiURL}/stores`)
   }

   //Guarda la orden de pedido
   saveOrder(order:Order):Observable<Order>{
      return this.http.post<Order>(`${this.apiURL}/orders`,order)
   }

   // Guarda los productos dentro del Cart que se creó, junto con un id y un order ID
   saveDetailsOrder(details:DetailsOrder):Observable<DetailsOrder>{
      return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`,details)
   }
}