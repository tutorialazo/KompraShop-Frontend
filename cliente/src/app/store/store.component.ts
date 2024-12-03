import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FloatingMenuComponent } from '../widgets/floating-menu/floating-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule, 
    FloatingMenuComponent, 
    HttpClientModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {
  vendedores: any[] = [];  // Para almacenar los vendedores

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener los vendedores desde la API
    this.http.get<any>('http://localhost:3000/api/front/vendedores').subscribe(
      response => {
        this.vendedores = response.vendedores || [];
      },
      error => {
        console.error('Error al obtener los vendedores:', error);
      }
    );
  }
}