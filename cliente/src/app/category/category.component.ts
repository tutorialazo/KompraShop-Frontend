import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FloatingMenuComponent } from '../widgets/floating-menu/floating-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule, 
    FloatingMenuComponent, 
    HttpClientModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categorias: any[] = [];  // Para almacenar las categorías

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener las categorías desde la API
    this.http.get<any>('http://localhost:3000/api/front/categorias').subscribe(
      response => {
        this.categorias = response.categorias || [];  // Asegurarse de que las categorías se almacenan correctamente
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }
}