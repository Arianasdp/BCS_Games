import { Component, inject } from '@angular/core';
import { ICard } from '../game.interfaces';
import { ScoreService } from '../../services/score.service';
import { AuthService } from '../../auth/auth.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-higher-lower',
  imports: [],
  templateUrl: './higher-lower.html',
  styleUrl: './higher-lower.css',
})
export class HigherLower {

  authS = inject(AuthService);
  scoreS = inject(ScoreService);
  audioS = inject(AudioService);

  deck?: string;

  cards: ICard[] = [];
  currentCard!: ICard;
  nextCard!: ICard;
  correct_cards = 0;

  score = 0;
  gameOver = false;
  roundResult: 'win' | 'lose' | null = null;

  generateDeck() {
    
    const suits = ['c', 'd', 't', 'p'];

    for (let suit of suits) {

        for (let i = 1; i <= 13; i++) {

          const img = `assets/games/higher-lower/${suit}${i}.png`;

          this.cards.push({
            value: i,
            suit,
            image: img
          });
        }
        
    }

    this.cards.push({
      value: 999,
      suit: 'joker',
      image: 'assets/games/higher-lower/j1.png',
      isJoker: true
    });

    this.cards.push({
      value: 999,
      suit: 'joker',
      image: 'assets/games/higher-lower/j2.png',
      isJoker: true
    });
  }

  ngOnInit() {
    this.deck = 'assets/games/higher-lower/mazo.png';
    this.startGame();
  }

  shuffle(array: ICard[]) {

    for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  startGame() {
    this.generateDeck();
    this.shuffle(this.cards);

    this.currentCard = this.cards.pop()!;
  }

  guess(direction: 'higher' | 'lower') {

    if (this.gameOver) return;

    const next = this.cards.pop();

    if (!next) {
      this.gameOver = true;
      return;
    }

    if (this.cards.length === 0) {
      this.generateDeck();
      this.shuffle(this.cards);
    }

    const isJoker = next.isJoker || this.currentCard.isJoker;

    let correct = false;

    if (isJoker) {
      this.score += 100;
      this.correct_cards++;
      correct = true;
    }else{
      correct =
      direction === 'higher'
        ? next.value >= this.currentCard.value
        : next.value <= this.currentCard.value;

        if (correct) {
          this.score += 10;
          this.correct_cards++;
        }
    }

    if (correct) {
      this.currentCard = next;
    }

    if (correct) {
      this.advanceRound(true);
    } else {
      this.audioS.play('gameOver');
      this.gameOver = true;
      this.scoreS.insertarHigherLower(this.authS.usuarioActual()?.user_metadata?.['nombre'], this.correct_cards, this.score);
    }
  }

  advanceRound(win: boolean) {

    this.roundResult = win ? 'win' : 'lose';

    setTimeout(() => {
      this.roundResult = null;

    }, 800);
  }

  resetGame() {

    this.cards = [];
    this.score = 0;
    this.correct_cards = 0;
    this.gameOver = false;
    this.roundResult = null;
    this.currentCard = null as any;
    this.nextCard = null as any;

    this.startGame();
  }

}
