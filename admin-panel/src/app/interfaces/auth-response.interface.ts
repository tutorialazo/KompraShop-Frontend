// src/app/interfaces/auth-response.interface.ts
export interface AuthResponse {
    token: string;
    vendedor: {
      id_vendedor: string;
      correo_vendedor: string;
      registro_completo: boolean;
    };
  }