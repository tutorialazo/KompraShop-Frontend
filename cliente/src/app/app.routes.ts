import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StoreComponent } from './store/store.component';
import { CategoryComponent } from './category/category.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent }, // Parámetro dinámico para el ID del producto
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'stores', component: StoreComponent },
    { path: 'store/:id', component: StoreDetailComponent }, // Parámetro dinámico para la tienda
    { path: 'categories', component: CategoryComponent },
    { path: 'category/:id', component: CategoryDetailComponent } // Parámetro dinámico para la categoría
];