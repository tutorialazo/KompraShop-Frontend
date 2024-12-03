import { Component } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FloatingMenuComponent } from '../widgets/floating-menu/floating-menu.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    LocationComponent,
    CommonModule,
    HttpClientModule, 
    FloatingMenuComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  carrito: any[] = [];  // Carrito de productos

  constructor() {}

  ngOnInit(): void {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      this.carrito = JSON.parse(storedCarrito);
    }
  }

  // Calcular el total de la compra
  totalCompra(): number {
    return this.carrito.reduce((total, producto) => {
      return total + (producto.precio_normal * producto.cantidad);
    }, 0);
  }

  // Función para redirigir a WhatsApp con la lista de productos
  enviarWhatsApp(): void {
    let mensaje = "Hola, me gustaría hacer el pedido de los siguientes productos:\n\n";
    this.carrito.forEach(producto => {
      mensaje += `Producto: ${producto.nombre_producto}\nPrecio: S/. ${producto.precio_normal}\nCantidad: ${producto.cantidad}\n\n`;
    });
    mensaje += `Total: S/. ${this.totalCompra()}\n\nGracias.`;

    // Codificar el mensaje para la URL
    mensaje = encodeURIComponent(mensaje);

    // Crear la URL de WhatsApp
    const url = `https://wa.me/51901551841?text=${mensaje}`;

    // Redirigir a WhatsApp
    window.open(url, "_blank");
  }
}
