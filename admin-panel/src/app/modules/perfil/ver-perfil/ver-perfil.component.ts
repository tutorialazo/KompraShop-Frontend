import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.scss'
})

export class VerPerfilComponent implements OnInit {
  vendedor: any = {};
  selectedSection: string = 'basic'; // Determina la sección visible
  basicInfo = { nombre_negocio: '', direccion: '', telefono: '' };
  emailInfo = { correo_vendedor: '' };
  passwordInfo = { contrasena_actual: '', nueva_contrasena: '' };
  selectedImage: File | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.vendedor = data;
        this.basicInfo.nombre_negocio = data.nombre_negocio;
        this.basicInfo.direccion = data.direccion;
        this.basicInfo.telefono = data.telefono;
        this.emailInfo.correo_vendedor = data.correo_vendedor;
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'No se pudo cargar el perfil');
      }
    });
  }

  setSection(section: string): void {
    this.selectedSection = section;
  }

  updateBasicInfo(): void {
    this.profileService.updateBasicInfo(this.basicInfo).subscribe({
      next: () => Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar el perfil', 'error')
    });
  }

  updateEmail(): void {
    this.profileService.updateEmail(this.emailInfo).subscribe({
      next: () => Swal.fire('Éxito', 'Correo actualizado correctamente', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar el correo', 'error')
    });
  }

  updatePassword(): void {
    this.profileService.updatePassword(this.passwordInfo).subscribe({
      next: () => Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error')
    });
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateProfilePicture(): void {
    if (!this.selectedImage) return;

    const formData = new FormData();
    formData.append('fotoPerfil', this.selectedImage);

    this.profileService.updateProfilePicture(formData).subscribe({
      next: () => Swal.fire('Éxito', 'Foto de perfil actualizada correctamente', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar la foto de perfil', 'error')
    });
  }
}