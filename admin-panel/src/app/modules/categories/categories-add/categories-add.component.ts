import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './categories-add.component.html',
  styleUrl: './categories-add.component.scss'
})
export class CategoriesAddComponent {
  nombre: string = '';
  descripcion: string = '';
  imagen: File | null = null;

  constructor(private categoryService: CategoryService, private router: Router) {}

  onFileSelected(event: any): void {
    this.imagen = event.target.files[0];
  }

  addCategory(): void {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    if (this.imagen) formData.append('imagen', this.imagen);

    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        Swal.fire('Categoría Agregada', 'La categoría ha sido creada correctamente.', 'success');
        this.router.navigate(['/categorias']);
      },
      error: () => {
        Swal.fire('Error', 'Hubo un problema al agregar la categoría.', 'error');
      }
    });
  }
}