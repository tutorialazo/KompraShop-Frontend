import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  @Output() locationSelected = new EventEmitter<string>();  // Emitimos el nombre de la ubicación seleccionada

  constructor() {}

  // Función para manejar la selección de ubicación
  selectLocation(location: string): void {
    this.locationSelected.emit(location);  // Emitimos la ubicación seleccionada
  }
}