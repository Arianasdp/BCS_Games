import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  scoreS = inject(ScoreService);

  ngAfterViewInit() {
      new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: true
      });
  }

  // hangmanS?: Promise<PostgrestSingleResponse<{name: any; score: any;}[]>>;
  // higherLowerS ?: Promise<PostgrestSingleResponse<{name: any; score: any;}[]>>;
  // triviaS?: Promise<PostgrestSingleResponse<{name: any; score: any;}[]>>;
  // pinkBunnyS?: Promise<PostgrestSingleResponse<{name: any; score: any;}[]>>;

  // ngOnInit() {
  //   this.hangmanS = this.scoreS.traer("hangman");
  //   this.higherLowerS = this.scoreS.traer("higherLower");
  //   this.triviaS = this.scoreS.traer("trivia");
  //   this.pinkBunnyS = this.scoreS.traer("pinkBunny");
  // }

  hangmanS = signal<{name: string, score: number}[]>([]);
  higherLowerS = signal<{name: string, score: number}[]>([]);
  triviaS = signal<{name: string, score: number}[]>([]);
  pinkBunnyS = signal<{name: string, score: number}[]>([]);

async ngOnInit() {

  const response =
    await this.scoreS.traer("hangman");

  this.hangmanS.set(response.data ?? []);

  const responseHigherLower =
    await this.scoreS.traer("higherLower");

  this.higherLowerS.set(responseHigherLower.data ?? []);

  const responseTrivia =
    await this.scoreS.traer("trivia");

  this.triviaS.set(responseTrivia.data ?? []);

  const responsePinkBunny =
    await this.scoreS.traer("pinkBunny");

  this.pinkBunnyS.set(responsePinkBunny.data ?? []);
}

  

}
