import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './categories-edit.component.html',
  styleUrl: './categories-edit.component.scss'
})

export class CategoriesEditComponent implements OnInit {
  id!: number;
  nombre: string = '';
  nombreOriginal: string = ''; // Variable para guardar el nombre original
  descripcion: string = '';
  imagen: File | null = null;
  imagenActual: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (!this.id) {
      Swal.fire('Error', 'ID de categoría no válido.', 'error');
      this.router.navigate(['/categorias']);
      return;
    }

    this.categoryService.getCategory(this.id).subscribe({
      next: (category) => {
        if (!category) {
          Swal.fire('Error', 'Categoría no encontrada.', 'error');
          this.router.navigate(['/categorias']);
          return;
        }
        this.nombre = category.nombre;
        this.nombreOriginal = category.nombre; // Guarda el nombre original
        this.descripcion = category.descripcion;
        this.imagenActual = category.imagen;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la categoría.', 'error');
        this.router.navigate(['/categorias']);
      }
    });
  }

  onFileSelected(event: any): void {
    this.imagen = event.target.files[0];
  }

  updateCategory(): void {
    // Verifica si el id es 1 y si el nombre ha cambiado
    if (this.id === 1 && this.nombre !== this.nombreOriginal) {
      Swal.fire('Acción no permitida', 'No se puede cambiar el nombre de la categoría por defecto.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    if (this.imagen) formData.append('imagen', this.imagen);

    this.categoryService.updateCategory(this.id, formData).subscribe({
      next: () => {
        Swal.fire('Categoría Actualizada', 'La categoría ha sido actualizada correctamente.', 'success');
        this.router.navigate(['/categorias']);
      },
      error: () => {
        Swal.fire('Error', 'Hubo un problema al actualizar la categoría.', 'error');
      }
    });
  }
}