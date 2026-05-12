import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AudioService {

    private masterVolume = 1;

    private sounds = {
        jump: new Audio('assets/sounds/jump.mp3'),
        wrong: new Audio('assets/sounds/wrong.mp3'),
        right: new Audio('assets/sounds/correct.mp3'),
        gameOver: new Audio('assets/sounds/game-over.mp3')
    };

    private lowVolumeSounds: (keyof typeof this.sounds)[] = [
        'jump',
        'right'];

    play(name: keyof typeof this.sounds) {
        const sound = this.sounds[name];

        sound.volume = this.lowVolumeSounds.includes(name)
        ? this.masterVolume * 0.3   // más bajo
        : this.masterVolume;  
        sound.currentTime = 0;
        sound.play();
    }

    setMasterVolume(value: number) {
        this.masterVolume = value;
    }

}