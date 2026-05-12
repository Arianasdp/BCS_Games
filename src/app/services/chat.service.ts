import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    supabaseS = inject(SupabaseService);

    async traer() {
        const response = await this.supabaseS.supabase.from("mensajes").select("*");

        return response.data;
    }

    async insertar(usuario: string, contenido: string) {
        const {data, error} = await this.supabaseS.supabase.from("mensajes").insert({
            usuario: usuario,
            contenido: contenido
        });
        
        console.log(data);
        console.log(error);
    }
}
