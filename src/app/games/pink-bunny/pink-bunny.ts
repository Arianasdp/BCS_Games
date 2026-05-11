import { Component,  ElementRef, ViewChild, AfterViewInit, HostListener, inject } from '@angular/core';
import { Theme } from '../../services/theme';
import { IPlayer, IObstacle} from '../game.interfaces';

@Component({
  standalone: true,
  selector: 'app-pink-bunny',
  imports: [],
  templateUrl: './pink-bunny.html',
  styleUrl: './pink-bunny.css',
})
export class PinkBunny implements AfterViewInit {

  themeS = inject(Theme);

  ngOnInit() {

    this.themeS.gameActive.set(true);
    this.themeS.isNight.set(true);
  }

  ngOnDestroy() {

    cancelAnimationFrame(this.gameLoopId);

    this.themeS.gameActive.set(false);
    this.themeS.isNight.set(false);

    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }

  @ViewChild('gameCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  gameStarted = false;
  gameOver = false;

  player!: IPlayer;

  y = 120;

  gravity = 0.8;

  groundY = 300;

  score = 0;

  frame = 0;

  gameSpeed = 6;

  spawnRate = 120;

  gameLoopId = 0;

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

    obstacles: IObstacle[] = [];

    obstacleSprites: HTMLImageElement[] = [];

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {

      if(event.code === 'Space') {

        (document.activeElement as HTMLElement)?.blur();

          if(this.gameOver) {

            this.resetGame();

            this.gameOver = false;

            this.gameStarted = true;
          }

          else if(!this.gameStarted) {

            this.gameStarted = true;
          }

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

    this.obstacleSprites = [
      this.obstacleS,
      this.obstacleM,
      this.obstacleL
    ];

    this.player = {

      x: 80,
      y: 300,

      width: 80,
      height: 80,

      velocityY: 0,

      jumpCount: 0,

      jumpsLeft: 2,

      runSprites: [
      this.run1,
      this.run2,
      this.run3,
      this.run4,
      this.run5,
      this.run6
    ],

      jumpSprite: this.jump
  };

    const canvas = this.canvasRef.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.gameLoop();
  }

  gameLoop() {

    this.update();

    this.draw();

    this.gameLoopId =
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {

    if(!this.gameStarted) return;
    
    this.player.velocityY += this.gravity;

    this.player.y += this.player.velocityY;

    if(this.player.y >= this.groundY) {

      this.player.y = this.groundY;

      this.player.velocityY = 0;

      this.player.jumpCount = 0;
    }

    this.score += 0.1;

    this.frame++;

    this.themeS.isNight.set(Math.floor(this.score / 100) % 2 === 0);

    this.gameSpeed = 6 + (this.score / 50);

    this.gameSpeed = Math.min(
      14,
      6 + (this.score / 50)
    );

    for(const obstacle of this.obstacles) {

      obstacle.x -= this.gameSpeed;
    }

    this.obstacles =
      this.obstacles.filter(
        obstacle => obstacle.x > -200
      );

    this.spawnRate = Math.max(
      60,
      120 - Math.floor(this.score / 10)
    );

    if(this.frame % this.spawnRate === 0) {

      this.spawnObstacle();
    }
    
    this.checkCollisions();

  } 

  draw() {

    const isNight = this.themeS.isNight();

    this.ctx.fillStyle = isNight ? '#000000' : '#ececec';
    this.ctx.fillRect(0, 0, 1000, 400);

    document.body.style.backgroundColor =
      isNight ? '#000000' : '#ececec';

    if (!this.gameStarted && !this.gameOver) {

      this.ctx.fillStyle = isNight ? '#ffffff' : '#000000';
      this.ctx.font = '40px Arial';

      this.ctx.fillText(
        'APRETÁ SPACE PARA EMPEZAR',
        190,
        200
      );

      return;
    }

    if (this.gameOver) {

      this.ctx.fillStyle = isNight ? '#ffffff' : '#000000';
      this.ctx.font = '50px Arial';

      this.ctx.fillText('GAME OVER', 320, 170);

      this.ctx.font = '30px Arial';
      this.ctx.fillText('SPACE PARA REINTENTAR', 260, 230);

      return;
    }

    this.renderGame();

  }

  jumpPlayer() {

      if(this.player.jumpCount < 2) {

      this.player.velocityY = -15;

      this.player.jumpCount++;
    }
  }

  spawnObstacle() {

    const randomIndex =
      Math.floor(Math.random() * 3);

    let sprite = this.obstacleSprites[randomIndex];

    let width = 60;

    if(randomIndex === 1) {

      width = 120;
    }

    if(randomIndex === 2) {

      width = 180;
    }

    const obstacle = {

      x: 1000,
      y: 320,

      width: width,
      height: 60,

      sprite: sprite

    };

    this.obstacles.push(obstacle);
  }

  checkCollisions() {

    for(const obstacle of this.obstacles) {

    const playerLeft = this.player.x + 10;
    const playerRight =
      this.player.x + this.player.width - 10;

    const playerTop = this.player.y + 10;

    const playerBottom =
      this.player.y + this.player.height - 10;

      const obstacleLeft = obstacle.x + 10;

    const obstacleRight =
      obstacle.x + obstacle.width - 10;

    const obstacleTop = obstacle.y + 10;

    const obstacleBottom =
      obstacle.y + obstacle.height - 10;

      const collision =

        playerLeft < obstacleRight &&
        playerRight > obstacleLeft &&
        playerTop < obstacleBottom &&
        playerBottom > obstacleTop;

      if(collision) {

        console.log('GAME OVER');

        this.gameStarted = false;
        this.gameOver = true;
      }
    }
  }

  resetGame() {

    this.score = 0;

    this.frame = 0;

    this.obstacles = [];

    this.player.x = 80;

    this.player.y = this.groundY;

    this.player.velocityY = 0;

    this.player.jumpCount = 0;
  }

  renderGame(){
    this.ctx.fillStyle = "#fe98bd";
    this.ctx.fillRect(0, 378, 1000, 1);

    this.ctx.fillStyle = '#fe98bd';

    this.ctx.font = '30px Arial';

    this.ctx.fillText(
      Math.floor(this.score).toString(),
      20,
      50
  );

  if(this.themeS.isNight()) {

    this.ctx.drawImage(this.moon, 900, 10, 80, 80);

  } else {

    this.ctx.drawImage(this.sun, 900, 10, 80, 80);
  }

  this.ctx.drawImage(
    this.cloud,
    120,
    40,
    140,
    70
  );

  this.ctx.drawImage(
    this.cloud,
    620,
    90,
    180,
    90
  );

    if(this.player.velocityY !== 0) {

      this.ctx.drawImage(

        this.player.jumpSprite,

        this.player.x,
        this.player.y,

        this.player.width,
        this.player.height
      );

    } else {

      const spriteIndex =
        Math.floor(this.frame / 6) % this.player.runSprites.length;

      const sprite = this.player.runSprites[spriteIndex];

      this.ctx.drawImage(
        sprite,
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );
    }

    for(const obstacle of this.obstacles) {

      this.ctx.drawImage(

        obstacle.sprite,

        obstacle.x,
        obstacle.y,

        obstacle.width,
        obstacle.height

      );}
  }

}
