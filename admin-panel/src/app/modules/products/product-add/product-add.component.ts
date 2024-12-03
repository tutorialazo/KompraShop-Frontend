import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})

export class ProductAddComponent implements OnInit {
  product = {
    nombre_producto: '',
    descripcion: '',
    precio_normal: 0,
    stock: 0,
    id_categoria: '',
    delivery: false
  };
  // Inicializar sugerencias con el texto solicitado
  sugerenciaNombre = 'Escribe el nombre de tu producto';
  sugerenciaDescripcion = 'Escribe el nombre de tu producto';

  categorias: any[] = [];
  selectedImages: File[] = [];
  principalImageIndex: number = 0;
  selectedVideos: File[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.productService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }

  onVideosSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedVideos = Array.from(input.files);
    }
  }

  addProduct(): void {
    if (!this.selectedImages.length) {
      alert("Seleccione al menos una imagen.");
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre_producto', this.product.nombre_producto);
    formData.append('descripcion', this.product.descripcion);
    formData.append('precio_normal', this.product.precio_normal.toString());
    formData.append('stock', this.product.stock.toString());
    formData.append('id_categoria', this.product.id_categoria);
    formData.append('delivery', this.product.delivery.toString());
  
    this.selectedImages.forEach((file, index) => {
      formData.append('imagenes', file);
      formData.append('es_principal', index === this.principalImageIndex ? 'true' : 'false');
    });
  
    this.selectedVideos.forEach((file) => {
      formData.append('videos', file);
    });
  
    // Usar formData.forEach para imprimir el contenido
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    this.productService.addProduct(formData).subscribe(() => this.router.navigate(['/productos']));
  }

  // Método para solicitar sugerencias
  solicitarSugerencia() {
    this.productService.generarSugerencia(this.product.nombre_producto, this.product.descripcion)
      .subscribe(response => {
        const sugerencia = response.sugerencia;
        console.log(sugerencia)
        // Usamos expresiones regulares para extraer el nombre y la descripción
        const nombreMatch = sugerencia.match(/\*\*Nombre del producto:\*\*\s*(.*)/);
        const descripcionMatch = sugerencia.match(/\*\*Descripción:\*\*\s*(.*)/);

        // Asignamos los valores si se encuentran, de lo contrario asignamos un valor vacío
        this.sugerenciaNombre = nombreMatch ? nombreMatch[1] : 'No se encontró nombre sugerido';
        this.sugerenciaDescripcion = descripcionMatch ? descripcionMatch[1] : 'No se encontró descripción sugerida';
      });
  }

  //// Métodos para copiar el nombre y la descripción sugeridos al portapapeles
  copiarNombre() {
    navigator.clipboard.writeText(this.sugerenciaNombre).then(() => {
      alert('Nombre copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar el nombre: ', err);
    });
  }

  copiarDescripcion() {
    navigator.clipboard.writeText(this.sugerenciaDescripcion).then(() => {
      alert('Descripción copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar la descripción: ', err);
    });
  }

}
