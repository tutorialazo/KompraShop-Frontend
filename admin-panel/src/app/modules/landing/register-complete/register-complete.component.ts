import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-complete',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './register-complete.component.html',
  styleUrl: './register-complete.component.scss'
})

export class RegisterCompleteComponent {
  idVendedor!: string;
  direccion: string = '';
  telefono: string = '';
  selectedFile!: File;

  constructor(private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: string };
    this.idVendedor = state.id;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('direccion', this.direccion);
    formData.append('telefono', this.telefono);
    if (this.selectedFile) {
      formData.append('fotoPerfil', this.selectedFile);
    }

    this.authService.completeRegister(this.idVendedor, formData).subscribe({
      next: (response) => {
        console.log('Registro completado!', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al completar registro', error);
      }
    });
  }
}
