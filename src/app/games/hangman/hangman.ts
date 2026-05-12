import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { AuthService } from '../../auth/auth.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {

  authS = inject(AuthService);
  scoreS = inject(ScoreService);
  audioS = inject(AudioService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.game_start = Date.now();
  }

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

  letters_selected = 0;

  game_duration = 0;

  game_start!: number;

  game_end!: number;

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

    this.letters_selected++;

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
      this.audioS.play('right');
      this.score += 100;

      this.roundTransition = true;

      setTimeout(() => {
        this.resetRound();
        this.roundTransition = false;
        this.cdr.markForCheck();
      }, 1000);
    }

    if (this.wrongAttempts >= this.maxAttempts) {
      this.audioS.play('gameOver');
      this.gameOver = true;
      this.game_end = Date.now();
      this.game_duration = Math.floor((this.game_end - this.game_start) / 1000);

      this.scoreS.insertarHangman(this.authS.usuarioActual()?.user_metadata?.['nombre'], this.letters_selected, this.game_duration, this.score);
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
    this.letters_selected = 0;

    this.game_start = Date.now();

    this.resetRound();
  }

}
