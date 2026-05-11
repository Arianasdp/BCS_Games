import { Injectable, signal, inject, effect } from '@angular/core';
import { Simpsons } from './simpsons';
import { ISimpsonsCharacter, Question, QuestionType } from './service.interface';

@Injectable({
    providedIn: 'root',
})
export class TriviaService {

    simpsonsS= inject(Simpsons);
    currentQuestion =
    signal<Question | null>(null);

    types: QuestionType[] = [
    'quoteToCharacter',
    'characterToQuote',
    'imageToCharacter'
    ];

    constructor() {

        effect(() => {

            const characters =
            this.simpsonsS.characters();

            if(
            characters.length > 0 &&
            !this.currentQuestion()
            ) {

            this.generateRandomQuestion();

            }

        });

    }

    init() {

        this.simpsonsS.loadCharacters();

    }

    generateRandomQuestion() {

    const randomType =
        this.types[
        Math.floor(Math.random() * this.types.length)
        ];

    const question =
        this.generateQuestion(randomType);

    this.currentQuestion.set(question);
    }

    getRandomCharacter(): ISimpsonsCharacter {

        const characters = this.simpsonsS.characters();

        return characters[
            Math.floor(Math.random() * characters.length)
        ];
    }

    getRandomCharacterNames(  cant: number, excludeName?: string): string[] {
        
        const characters = this.simpsonsS.characters();
        const names: string[] = [];

        while(names.length < cant) {

            const randomCharacter =
            characters[Math.floor(Math.random() * characters.length)];

            const randomName =
            randomCharacter.name;

            const alreadyExists =
            names.includes(randomName);

            const isExcluded =
            randomName === excludeName;

            if(!alreadyExists && !isExcluded) {
                names.push(randomName);
            }
        }

        return names;
    }

    shuffle(array: string[]) {
    
        for (let i = array.length - 1; i > 0; i--) {
    
            const j = Math.floor(Math.random() * (i + 1));
        
            [array[i], array[j]] = [array[j], array[i]];
        }
    
        return array;
    }

    generateQuestion(type: QuestionType) {

        switch(type) {

            case 'quoteToCharacter':
            return this.generateQuoteToCharacterQuestion();

            case 'characterToQuote':
            return this.generateCharacterToQuoteQuestion();

            case 'imageToCharacter':
            return this.generateImageToCharacterQuestion();

        }
    }

    generateQuoteToCharacterQuestion(): Question {

        const correctCharacter = this.getRandomCharacter();

        const wrongOptions =
            this.getRandomCharacterNames(3, correctCharacter.name);

        const options = [
            correctCharacter.name,
            ...wrongOptions
        ];

        return {

            type: 'quoteToCharacter',

            prompt: `Quién dijo esta frase:"${this.getRandomItem(correctCharacter.phrases)}"?`,

            options: this.shuffle(options),

            correctAnswer:
            correctCharacter.name
        };
    }

    getRandomItem(array: string[]): string {

        const validItems =
            array.filter(item =>
            item &&
            item.trim() !== ''
            );

        return validItems[
            Math.floor(
            Math.random() * validItems.length
            )
        ];

    }

    getRandomPhrases(cant: number, excludeName?: string) {

        const characters = this.simpsonsS.characters();
        const phrases: string[] = [];

        while(phrases.length < cant) {

            const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

            const randomPhrase = this.getRandomItem(randomCharacter.phrases);

            const isExcluded = randomCharacter.name === excludeName;

            if(!isExcluded) {
                phrases.push(randomPhrase);
            }
        }

        return phrases;

    }


    generateCharacterToQuoteQuestion(): Question {

        const correctCharacter = this.getRandomCharacter();

        const correctOption = this.getRandomItem(correctCharacter.phrases);

        const wrongOptions = this.getRandomPhrases(3, correctCharacter.name);

        const options = [
            correctOption,
            ...wrongOptions];

        return {

            type: 'characterToQuote',

            prompt: `¿Qué frase pertenece a ${correctCharacter.name}?`,

            options: this.shuffle(options),

            correctAnswer: correctOption
        };

    }

    generateImageToCharacterQuestion(): Question {

        const correctCharacter = this.getRandomCharacter();

        const wrongOptions = this.getRandomCharacterNames(3);

        const options = [
            correctCharacter.name,
            ...wrongOptions
        ];

        const imageUrl = `https://cdn.thesimpsonsapi.com/500${correctCharacter.portrait_path}`;

        return {

            type: 'imageToCharacter',

            prompt: '¿Qué personaje es este?',

            image: imageUrl,

            options: this.shuffle(options),

            correctAnswer: correctCharacter.name
        };
    }
}