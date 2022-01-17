import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  }
  constructor() { }

  ngOnInit(): void {
  }

}
