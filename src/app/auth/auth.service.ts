import { Injectable, OnInit, computed, WritableSignal, inject, signal } from '@angular/core';
import { AuthResponse, User } from '@supabase/supabase-js';
import { ILogin, IRegistro } from './auth.interfaces';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  supabaseS = inject(SupabaseService);

  usuarioActual: WritableSignal<User | null> = signal<User | null>(null);

  router = inject(Router);

  constructor() {

    this.supabaseS.supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      this.usuarioActual.set(user ?? null);
    });
  }

  async registrar ({email, password, nombre, apellido, edad} : IRegistro): Promise<string | null> {
    const response: AuthResponse = await this.supabaseS.supabase?.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nombre: nombre,
          apellido: apellido,
          edad: edad
        }
      }
    });

    if (response.error) {
      const msg = response.error.message;

      if (msg.includes('User already registered')) {
        return 'Este email ya está registrado';
      }

      return 'No se pudo registrar el usuario';
    }

    this.router.navigateByUrl('/home');

    return null;
  }

  async loguear ({email, password} : ILogin):  Promise<string | null>  {

    const response: AuthResponse = await this.supabaseS.supabase?.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if(response.error)
    {
      const msg = response.error.message;

      if (msg.includes('Invalid login credentials')) {
        return 'Email o contraseña incorrectos';
      }

        return 'Error al iniciar sesión';
    }

    this.router.navigateByUrl('/home');
    
      return null;
  }

  async cerrarSesion () {
    await this.supabaseS.supabase.auth.signOut();
    this.router.navigateByUrl('/auth/login');
  }

  isLoggedIn = computed(() => this.usuarioActual() !== null);
}
