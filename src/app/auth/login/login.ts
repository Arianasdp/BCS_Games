import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);

  miForm: FormGroup;

  constructor(private fb: FormBuilder,
  private router: Router) {
    this.miForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

  loginError = signal<string | null>(null);

  async accion() {
    if(this.miForm.invalid)
    {
      return;
    }

    // this.miForm.value;

    // this.authService.loguear(this.miForm.value);

    // this.router.navigate(['/home']);
    const error = await this.authService.loguear(this.miForm.value);

    if (error) {
      this.loginError.set(error);
      return;
    }

    this.router.navigate(['/home']);
  }

  usuariosRapidos = [
    {
      email: 'margotrobbie@gmail.com',
      password: 'barbiemovie'
    },
    {
      email: 'juancarlosbodoque@gmail.com',
      password: 'mequieromatar'
    },
    {
      email: 'tulio31minutos@gmail.com',
      password: 'lomerezco'
    }
  ];

  cargarUsuario(user: any) {
    this.miForm.patchValue({
      email: user.email,
      password: user.password
    });
  }
}
