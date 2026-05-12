import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AudioService {

    private sounds = {
        jump: new Audio('assets/sounds/jump.mp3'),
        wrong: new Audio('assets/sounds/wrong.mp3'),
        right: new Audio('assets/sounds/correct.mp3'),
        gameOver: new Audio('assets/sounds/game-over.mp3')
    };

    play(name: keyof typeof this.sounds) {
        const sound = this.sounds[name];
        sound.currentTime = 0;
        sound.volume = 0.5;
        sound.play();
    }

}