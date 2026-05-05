import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  authService = inject(AuthService);

  miForm: FormGroup;

  constructor(private fb: FormBuilder,
  private router: Router) {
    this.miForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      edad:  ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellido() {
    return this.miForm.get('apellido');
  }

  get edad() {
    return this.miForm.get('edad');
  }
  
  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

  registroError: string | null = null;
  
  async accion() {
    if(this.miForm.invalid)
    {
      return;
    }

    // this.miForm.value;

    // this.authService.registrar(this.miForm.value);

    // this.router.navigate(['/home']);
    const error = await this.authService.registrar(this.miForm.value);

    if (error) {
      this.registroError = error;
      return;
    }

    this.router.navigate(['/home']);
  }
}
