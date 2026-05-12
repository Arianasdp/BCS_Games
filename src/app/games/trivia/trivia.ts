import { Component, inject, signal, ChangeDetectorRef} from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { ScoreService } from '../../services/score.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-trivia',
  imports: [],
  templateUrl: './trivia.html',
  styleUrl: './trivia.css',
})
export class Trivia {

  authS = inject(AuthService);
  scoreS = inject(ScoreService);
  triviaS = inject(TriviaService);

  cdr = inject(ChangeDetectorRef);

  score = 0;
  correct_answers = 0;

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
      this.correct_answers++;

      this.roundTransition = true;

      setTimeout(() => {

        this.triviaS.generateRandomQuestion();
        this.roundTransition = false;
        this.cdr.markForCheck();

      }, 1000);

    }
    else {
      this.gameOver = true;
      this.scoreS.insertarTrivia(this.authS.usuarioActual()?.user_metadata?.['nombre'], this.correct_answers, this.score);

    }
  }

  resetGame() {

    this.score = 0;
    this.correct_answers = 0;

    this.gameOver = false;

    this.triviaS.generateRandomQuestion();
  }
}
