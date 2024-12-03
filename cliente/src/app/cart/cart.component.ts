import { Component, OnInit } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FloatingMenuComponent } from '../widgets/floating-menu/floating-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    LocationComponent,
    CommonModule,
    HttpClientModule, 
    FloatingMenuComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  carrito: any[] = [];  // Carrito de productos

  constructor(private router: Router) {}  // Inyecta el Router

  ngOnInit(): void {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      this.carrito = JSON.parse(storedCarrito);
    }
  }

  // Función para aumentar la cantidad de un producto en el carrito
  aumentarCantidad(producto: any): void {
    producto.cantidad++;
    this.actualizarCarrito();
  }

  // Función para disminuir la cantidad de un producto en el carrito
  disminuirCantidad(producto: any): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.actualizarCarrito();
    }
  }

  // Función para eliminar un producto del carrito
  eliminarProducto(producto: any): void {
    this.carrito = this.carrito.filter(item => item.nombre_producto !== producto.nombre_producto);
    this.actualizarCarrito();
  }

  // Guardar el carrito actualizado en el localStorage
  actualizarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // Función para redirigir a la página de checkout
  irAComprar(): void {
    this.router.navigate(['/checkout']);  // Navega hacia la ruta /checkout
  }
}