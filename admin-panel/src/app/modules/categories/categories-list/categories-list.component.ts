import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      }
    });
  }

  deleteCategory(id: number): void {
    if (id === 1) {
      Swal.fire({
        title: 'Acción no permitida',
        text: 'La categoría por defecto no puede ser eliminada.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá recuperar esta categoría una vez eliminada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.categories = this.categories.filter(category => category.id_categoria !== id);
          Swal.fire(
            'Eliminada',
            'La categoría ha sido eliminada correctamente.',
            'success'
          );
        });
      }
    });
  }
}