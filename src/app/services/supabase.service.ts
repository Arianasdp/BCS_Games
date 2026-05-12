import { Injectable, signal } from '@angular/core';
import { AuthResponse, createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {

    supabase: SupabaseClient<any, "public", "public", any, any>;

    supabaseUrl = 'https://hcrewwunbqkwybzpppnz.supabase.co';

    publishableKey = 'sb_publishable_IGpEFY3_wjcW6hX-PD66xg_ImG4-etA';

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.publishableKey);
    }
}