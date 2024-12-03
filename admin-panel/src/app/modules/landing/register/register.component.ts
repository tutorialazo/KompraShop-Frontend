import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  nombreNegocio: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Botón de registrar presionado'); // Depuración
    this.authService.register(this.nombreNegocio, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso!', response);
        this.authService.saveToken(response.token);

        // Redirigir a /register/complete pasando el ID del vendedor como parámetro
        this.router.navigate(['/register/complete'], { state: { id: response.vendedor.id_vendedor } });
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
  }
}