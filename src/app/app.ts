import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Chat } from './pages/chat/chat';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authS = inject(AuthService);
  themeS = inject(Theme);
  router = inject(Router);
  
  protected readonly title = signal('BCS-games');
}
