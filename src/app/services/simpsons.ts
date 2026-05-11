import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ISimpsonsCharacter } from './service.interface';

@Injectable({
  providedIn: 'root',
})
export class Simpsons {

  http = inject(HttpClient);
  
  apiSimpsons ='https://thesimpsonsapi.com/api/characters';

  characters = signal<ISimpsonsCharacter[]>([]);

  loadCharacters() {

    this.http.get<any>(this.apiSimpsons).subscribe(data => {

        this.characters.set(data.results);

      });
  }

}
