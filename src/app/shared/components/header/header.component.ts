import { Component } from '@angular/core';
import { ShopingCartService } from '../../services/shopping-card.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="nav">
      <span>Store App</span>
      <span class="example-spacer"></span>
      <app-cart></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
