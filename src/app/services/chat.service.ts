import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    supabaseS = inject(SupabaseService);
    canal: RealtimeChannel;

    constructor() {
        this.canal = this.supabaseS.supabase.channel('tabla-db-changes');

        const definicion = this.canal.on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'mensajes'
            },
            (data) => {
                console.log(data);
            },
        );

        const suscripcion = definicion.subscribe();
    }

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
