import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Chat } from './pages/chat/chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authS = inject(AuthService);
  
  protected readonly title = signal('BCS-games');
}
