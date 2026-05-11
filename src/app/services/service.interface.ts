export type QuestionType =
    | 'quoteToCharacter'
    | 'characterToQuote'
    | 'imageToCharacter';

export interface Question {
    type: QuestionType;

    prompt: string;

    options: string[];

    correctAnswer: string;

    image?: string;

    phrase?: string;
}

export interface ISimpsonsCharacter {
    name: string;
    portrait_path: string;
    phrases: string[];
}