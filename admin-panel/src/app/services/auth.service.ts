import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/vendedores/auth'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { correo_vendedor: email, contraseña: password }).pipe(
      tap((response: AuthResponse) => {
        this.saveToken(response.token);
        localStorage.setItem('registro_completo', String(response.vendedor.registro_completo));
      })
    );
  }

  isRegistrationComplete(): boolean {
    return localStorage.getItem('registro_completo') === 'true';
  }

  // Método para guardar el token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si hay un token
  }

  // Método para logout (eliminar el token)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Otros métodos para registro,
  register(nombreNegocio: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nombre_negocio: nombreNegocio,
      correo_vendedor: email,
      contraseña: password
    });
  }

  completeRegister(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/register/complete/${id}`, formData);
  }
  

}
