import { Component } from '@angular/core';

type Card = {
  
  value: number;
  suit: string;
  image: string;
  isJoker?: boolean;
}


@Component({
  selector: 'app-higher-lower',
  imports: [],
  templateUrl: './higher-lower.html',
  styleUrl: './higher-lower.css',
})
export class HigherLower {

deck?: string;

cards: Card[] = [];
currentCard!: Card;
nextCard!: Card;

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

  shuffle(array: Card[]) {

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

    this.nextCard = next;

    if (this.cards.length === 0) {
      this.generateDeck();
      this.shuffle(this.cards);
    }

    const isJoker = next.isJoker || this.currentCard.isJoker;

    if (isJoker) {
      this.score += 200;
      this.advanceRound(true);
      return;
    }

    const correct =
      direction === 'higher'
        ? this.nextCard.value >= this.currentCard.value
        : this.nextCard.value <= this.currentCard.value;

    if (correct) {
      this.score += 10;
      this.advanceRound(true);
    } else {
      this.gameOver = true;
    }

  }

  advanceRound(win: boolean) {

  this.roundResult = win ? 'win' : 'lose';

  setTimeout(() => {

    this.currentCard = this.nextCard;
    this.nextCard = null as any;
    this.roundResult = null;

  }, 800);
}

resetGame() {

  this.cards = [];
  this.score = 0;
  this.gameOver = false;
  this.roundResult = null;
  this.currentCard = null as any;
  this.nextCard = null as any;

  this.startGame();
}

}
