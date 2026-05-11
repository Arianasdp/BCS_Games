import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {

  constructor(private cdr: ChangeDetectorRef) {}

  words = [
    'CAT',
    'BUNNY',
    'PINK',
    'FLOWER',
    'RAINBOW',
    'WORCESTERSHIRE',
    'ONOMATOPOEIA'
  ];

  getRandomWord(): string {

      const index = Math.floor(Math.random() * this.words.length);

      return this.words[index];
  }

  word = this.getRandomWord();

  guessedLetters: string[] = [];

  wrongAttempts = 0;

  maxAttempts = 8;

  gameOver = false;

  score = 0;

  roundTransition: boolean = false;

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  hangmanImages = [
    'assets/games/hangman/h1.png',
    'assets/games/hangman/h2.png',
    'assets/games/hangman/h3.png',
    'assets/games/hangman/h4.png',
    'assets/games/hangman/h5.png',
    'assets/games/hangman/h6.png',
    'assets/games/hangman/h7.png',
    'assets/games/hangman/h8.png'
  ];

  get displayWord(): string[] {
      return this.word.split('').map(letter =>
        this.guessedLetters.includes(letter)
          ? letter
          : '_'
      );
    }

  guessLetter(letter: string) {
    if (this.gameOver) return;

    this.guessedLetters.push(letter);

    if (this.word.includes(letter)) {
      const occurrences = this.word.split('').filter(l => l === letter).length;

        this.score += occurrences * 10;
    }
    else {
      this.wrongAttempts++;
    }

    this.checkGameState();
  }

  checkGameState() {

  const won = this.word.split('').every(letter =>
      this.guessedLetters.includes(letter));

    if (won) {
      this.score += 100;

      this.roundTransition = true;

      setTimeout(() => {
        this.resetRound();
        this.roundTransition = false;
        this.cdr.markForCheck();
      }, 1000);
    }

    if (this.wrongAttempts >= this.maxAttempts) {
      this.gameOver = true;
    }
  }

  resetRound() {

      this.word = this.getRandomWord();

      this.guessedLetters = [];

      this.wrongAttempts = 0;

      this.gameOver = false;

  }

  resetGame() {

    this.score = 0;

    this.resetRound();
  }

}
