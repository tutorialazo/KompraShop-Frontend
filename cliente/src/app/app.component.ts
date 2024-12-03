import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SplashComponent } from './widgets/splash/splash.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SplashComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cliente';
  showSplash = true;
  showModal = false;  // Inicializamos el modal como oculto

  constructor(private router: Router) {
    setTimeout(() => {
      this.showSplash = false;  // Ocultamos el splash después de 1 segundo

      // Verificamos si hay una ciudad guardada en el localStorage
      const storedLocation = localStorage.getItem('userLocation');
      if (storedLocation) {
        this.router.navigate(['']);  // Si ya hay ciudad, navegamos al home
      } else {
        this.showModal = true;  // Si no hay ciudad, mostramos el modal
        this.router.navigate(['']);  // Navegamos igualmente al home
      }
    }, 1500);  // 1 segundo
  }
}