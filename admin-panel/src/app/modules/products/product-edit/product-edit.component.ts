import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})

export class ProductEditComponent implements OnInit {
  product: any = {};
  categorias: any[] = [];
  id: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Cargar el producto a editar
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });

    // Cargar las categorías disponibles
    this.productService.getCategorias().subscribe((categoriasData) => {
      this.categorias = categoriasData;
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.id, this.product).subscribe(() => {
      this.router.navigate(['/productos']); // Redirige de nuevo a la lista de productos
    });
  }
}