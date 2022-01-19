import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="nav">
      <a [routerLink]="['/']"><span>Store App</span></a>
      
      <span class="example-spacer"></span>
      <app-cart class="mouse-pointer" [routerLink]="['/checkout']" ></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
