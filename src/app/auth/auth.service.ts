import { Injectable, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { AuthResponse, createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { ILogin, IRegistro } from './auth.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  supabase: SupabaseClient<any, "public", "public", any, any>;

  supabaseUrl = 'https://hcrewwunbqkwybzpppnz.supabase.co';

  publishableKey = 'sb_publishable_IGpEFY3_wjcW6hX-PD66xg_ImG4-etA';

  usuarioActual: WritableSignal<User | null> = signal<User | null>(null);

  router = inject(Router);

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.publishableKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      this.usuarioActual.set(user ?? null);

      if (user) {
        this.router.navigateByUrl("");
      } else {
        this.router.navigateByUrl("/auth/login");
      }
    });
  }

  async registrar ({email, password, nombre, apellido, edad} : IRegistro): Promise<string | null> {
    const response: AuthResponse = await this.supabase?.auth.signUp({
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
    
      return null;
  }

  async loguear ({email, password} : ILogin):  Promise<string | null>  {

    const response: AuthResponse = await this.supabase?.auth.signInWithPassword({
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
    
      return null;
  }

  async cerrarSesion () {
    await this.supabase.auth.signOut();
  }
}
