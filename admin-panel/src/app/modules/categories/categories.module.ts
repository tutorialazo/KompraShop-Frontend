import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    CategoriesComponent,
    //Crud
    
  ]
})
export class CategoriesModule { }
