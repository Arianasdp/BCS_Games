import { Component, inject, OnInit, signal, WritableSignal, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../../services/chat.service';
import { IMensaje } from '../../services/service.interface';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { afterNextRender } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit{
  
  authS = inject(AuthService);
  chatS = inject(ChatService);
  mensajes: WritableSignal<IMensaje[]> = signal([]);

  @ViewChild('chatBox')
  chatBox!: ElementRef<HTMLDivElement>;

  contenido: string = '';

  async ngOnInit(): Promise<void> {
    const data = (await this.chatS.traer()) as IMensaje[];
    this.scrollToBottom();

    this.mensajes.set(data);

    this.chatS.canal.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'mensajes'
        },
        (payload) => {

            this.mensajes.update((valor) => [
                ...valor,
                payload.new as IMensaje
            ]);

        }
    );

    this.chatS.canal.subscribe((status) => {
        console.log(status);
    });
  }

  enviar() {
    this.chatS.insertar(this.authS.usuarioActual()?.user_metadata?.['nombre'], this.contenido);
    
    this.contenido = '';
    this.scrollToBottom();
  }
  
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  scrollToBottom() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = this.chatBox.nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  });}
}
