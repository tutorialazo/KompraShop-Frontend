import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Obtener la lista de productos del vendedor autenticado
    this.productService.getProducts().subscribe({
        next: (data) => {
            this.products = data;
        },
        error: (error) => {
            console.error("Error al obtener productos:", error);
        }
    });
  }

  deleteProduct(id: number): void {
    Swal.fire({
        title: '¿Está seguro?',
        text: '¡No podrá recuperar este producto una vez eliminado!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.productService.deleteProduct(id).subscribe(() => {
                this.products = this.products.filter((product) => product.id_producto !== id);
                Swal.fire(
                    'Eliminado',
                    'El producto ha sido eliminado correctamente.',
                    'success'
                );
            });
        }
    });
  }
}