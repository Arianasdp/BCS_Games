import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}
