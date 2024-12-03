import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrdersComponent
  ]
})
export class OrdersModule { }
