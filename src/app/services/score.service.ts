import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {

    supabaseS = inject(SupabaseService);

    async traer(table: string) {
        const response = await this.supabaseS.supabase.from(table).select("name, score").order("score", { ascending: false });

        return response;
    }

    async insertarHangman(name: string, letters_selected: number, game_duration: number, score: number){
        const { data, error } = await this.supabaseS.supabase.from("hangman").insert({
            name: name,
            letters_selected: letters_selected,
            game_duration: game_duration,
            score: score
        });

        console.log(data);
        console.log(error);
    }

    async insertarHigherLower(name: string, correct_cards: number, score: number){
        const { data, error } = await this.supabaseS.supabase.from("higherLower").insert({
            name: name,
            correct_cards: correct_cards,
            score: score
        });

        console.log(data);
        console.log(error);
    }

    async insertarTrivia(name: string, correct_answers: number, score: number){
        const { data, error } = await this.supabaseS.supabase.from("trivia").insert({
            name: name,
            correct_answers: correct_answers,
            score: score
        });

        console.log(data);
        console.log(error);
    }

    async insertarPinkBunny(name: string, score: number){
        const { data, error } = await this.supabaseS.supabase.from("pinkBunny").insert({
            name: name,
            score: score
        });

        console.log(data);
        console.log(error);
    }
}