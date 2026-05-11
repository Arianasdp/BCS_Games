import { Component, inject, signal, ChangeDetectorRef, effect } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';

@Component({
  selector: 'app-trivia',
  imports: [],
  templateUrl: './trivia.html',
  styleUrl: './trivia.css',
})
export class Trivia {

  triviaS = inject(TriviaService);

  cdr = inject(ChangeDetectorRef);

  score = 0;

  gameOver = false;

  roundTransition = false;

  ngOnInit() {

    this.triviaS.init();

  }

  answer(option: string) {

    const question =
      this.triviaS.currentQuestion();

    if(!question) return;

    if(option === question.correctAnswer) {

      this.score += 100;

      this.roundTransition = true;

      setTimeout(() => {

        this.triviaS.generateRandomQuestion();
        this.roundTransition = false;
        this.cdr.markForCheck();

      }, 1000);

    }
    else {
      this.gameOver = true;

    }
  }

  resetGame() {

    this.score = 0;

    this.gameOver = false;

    this.triviaS.generateRandomQuestion();
  }
}
