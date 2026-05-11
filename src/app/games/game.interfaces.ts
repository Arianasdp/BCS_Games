export interface ICard {
    value: number;
    suit: string;
    image: string;
    isJoker?: boolean;
}

export interface IPlayer {

    x: number;
    y: number;

    width: number;
    height: number;

    velocityY: number;

    jumpCount: number;

    jumpsLeft: number;

    runSprites: HTMLImageElement[];

    jumpSprite: HTMLImageElement;
}

export interface IObstacle {

    x: number;
    y: number;

    width: number;
    height: number;

    sprite: HTMLImageElement;

}