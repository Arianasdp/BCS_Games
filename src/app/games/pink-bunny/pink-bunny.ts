import { Component,  ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pink-bunny',
  imports: [],
  templateUrl: './pink-bunny.html',
  styleUrl: './pink-bunny.css',
})
export class PinkBunny implements AfterViewInit {

  @ViewChild('gameCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  playerX = 80;
  playerY = 300;

  velocityY = 0;
  isJumping = false;
  y = 120;

  gravity = 0.8;

  groundY = 300;

  score = 0;

  obstacles = [];

  frame = 0;

  isNight = false;

  run1: HTMLImageElement = new Image();
  run2: HTMLImageElement = new Image();
  run3: HTMLImageElement = new Image();
  run4: HTMLImageElement = new Image();
  run5: HTMLImageElement = new Image();
  run6: HTMLImageElement = new Image();
  jump: HTMLImageElement = new Image();

  sun: HTMLImageElement  = new Image();
  moon: HTMLImageElement  = new Image();
  cloud: HTMLImageElement  = new Image();

  obstacleS: HTMLImageElement  = new Image();
  obstacleM: HTMLImageElement  = new Image();
  obstacleL: HTMLImageElement  = new Image();

  runningSprites = [
      this.run1,
      this.run2,
      this.run3,
      this.run4,
      this.run5,
      this.run6
    ];

    // obstacleList: any[] = [this.obstacleS, this.obstacleM, this.obstacleL];

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {

      if(event.code === 'Space') {

        this.jumpPlayer();
      }
    }

  ngAfterViewInit() {

    this.run1.src = 'assets/games/pinkBunny/br0.png';
    this.run2.src = 'assets/games/pinkBunny/br1.png';
    this.run3.src = 'assets/games/pinkBunny/br2.png';
    this.run4.src = 'assets/games/pinkBunny/br3.png';
    this.run5.src = 'assets/games/pinkBunny/br4.png';
    this.run6.src = 'assets/games/pinkBunny/br5.png';
    this.jump.src = 'assets/games/pinkBunny/b1.png';

    this.sun.src = 'assets/games/pinkBunny/sol.png';
    this.moon.src = 'assets/games/pinkBunny/luna.png';
    this.cloud.src = 'assets/games/pinkBunny/nubes.png';

    this.obstacleS.src = 'assets/games/pinkBunny/obstacle1.png';
    this.obstacleM.src = 'assets/games/pinkBunny/obstacle2.png';
    this.obstacleL.src = 'assets/games/pinkBunny/obstacle3.png';

    const canvas = this.canvasRef.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.gameLoop();
  }

  gameLoop() {

    this.update();

    this.draw();

    requestAnimationFrame(() => this.gameLoop());
  }

  update() {

      if (this.isJumping) {

      this.velocityY += this.gravity;

      this.playerY += this.velocityY;

      if (this.playerY >= this.groundY) {

        this.playerY = this.groundY;

        this.velocityY = 0;

        this.isJumping = false;
      }
    }

    this.score += 0.1;

    this.frame++;

  } 

  draw() {
    this.ctx.clearRect(0, 0, 1000, 400);

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, 1000, 400);

    this.ctx.fillStyle = "#fe98bd";
    this.ctx.fillRect(0, 378, 1000, 1);

    this.ctx.fillStyle = '#fe98bd';

    this.ctx.font = '30px Arial';

    this.ctx.fillText(
      Math.floor(this.score).toString(),
      20,
      50
  );

  this.ctx.drawImage(
        this.sun,
        900,
        10,
        80,
        80
      );

    if(this.isJumping) {

      this.ctx.drawImage(
        this.jump,
        this.playerX,
        this.playerY,
        80,
        80
      );

    } else {

      const spriteIndex =
        Math.floor(this.frame / 6) % this.runningSprites.length;

      const sprite = this.runningSprites[spriteIndex];

      this.ctx.drawImage(
        sprite,
        this.playerX,
        this.playerY,
        80,
        80
      );
    }
  }

  jumpPlayer() {

    if(!this.isJumping) {

      this.isJumping = true;

      this.velocityY = -15;
    }
  }

}
