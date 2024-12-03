import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  // Obtener perfil
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Actualizar perfil básico
  updateBasicInfo(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/basico`, data);
  }

  // Actualizar correo
  updateEmail(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/correo`, data);
  }

  // Actualizar contraseña
  updatePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/contraseña`, data);
  }

  // Actualizar foto de perfil
  updateProfilePicture(data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/foto`, data);
  }
}