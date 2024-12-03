import { Component, OnInit } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FloatingMenuComponent } from '../widgets/floating-menu/floating-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LocationComponent,
    CommonModule,
    HttpClientModule, 
    FloatingMenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userLocation: string | null = null;
  showModal = false;

  productos: any[] = [];  // Para almacenar los productos
  carrito: any[] = [];  // Carrito de productos

  constructor(private http: HttpClient, private router: Router) {}  // Inyectar Router

  ngOnInit(): void {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      this.userLocation = storedLocation;
      this.obtenerProductos(this.userLocation);
    } else {
      this.showModal = true;  // Si no hay ubicación guardada, mostramos el modal
    }

    // Cargar carrito desde el localStorage
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      this.carrito = JSON.parse(storedCarrito);
    }
  }

  onLocationSelected(location: string): void {
    this.userLocation = location;
    localStorage.setItem('userLocation', location);
    this.showModal = false;

    this.carrito = []; 
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    this.obtenerProductos(location);
  }

  obtenerProductos(ciudad: string): void {
    const apiUrl = `http://localhost:3000/api/front/productos/ciudad/${ciudad}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.productos = response.productos || [];
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  // Función para añadir un producto al carrito
  addirAlCarrito(producto: any): void {
    const existeProducto = this.carrito.find(item => item.nombre_producto === producto.nombre_producto);

    if (existeProducto) {
      // Si el producto ya existe, incrementamos la cantidad
      existeProducto.cantidad++;
    } else {
      // Si el producto no está en el carrito, lo añadimos con cantidad 1
      this.carrito.push({
        nombre_producto: producto.nombre_producto,
        precio_normal: producto.precio_normal,
        imagen: producto.imagenes[0]?.url_imagen,
        cantidad: 1  // Inicializamos la cantidad en 1
      });
    }

    // Guardamos el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    // Redirigimos al carrito después de añadir el producto
    this.router.navigate(['/cart']);  // Redirección
  }

  showLocationModal(): void {
    this.showModal = true;
  }
}

