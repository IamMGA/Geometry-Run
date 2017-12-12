var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Player() {
  //cargamos el sprite
  this.sprite = new Image();
  this.sprite.src = "images/iron-sprite-all.png";
  this.isReady = false;
  this.sprite.onload = (function () {
    this.isReady = true;
  }).bind(this);
  this.sprite.frames = 8;
  this.sprite.frameIndex = 1;
  //posicionamos el sprite
  this.x = 125;
  this.y = 340;
  //escalado de la imagen
  this.scale = 0.18;
  //frames sirve para reducir velocidades y que no vaya todo a 60 fps
  this.frames = 0;
  //Ymove es para el salto y la caida del player
  this.yMove = 0;
  //velocidad del salto
  this.vy = 8;
  this.isJumping = false;
  this.hasGravity = false;
  this.canMove = true;
  this.suelo = 340;

  this.keys = [];

  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onkeyup.bind(this);
}

Player.prototype.draw = function () {
  //para el movimiento de salto
  this.y += this.yMove * this.vy;

  if (this.isReady) {
    ctx.drawImage(
      this.sprite, // Image
      this.sprite.frameIndex * Math.floor(this.sprite.width / this.sprite.frames), // source x 
      0, // source y: allways 0 for this image
      Math.floor(this.sprite.width / this.sprite.frames), // frame width 
      this.sprite.height, // frame heigth
      this.x, // destination x
      this.y, // destination y
      Math.floor(this.sprite.width / this.sprite.frames) * this.scale, // destination frame width 
      this.sprite.height * this.scale); // destination frame heigth
    this.frames++;
    //cuando frames valga 7 hace el cambio de sprite
    if (this.frames == 7 && !this.isJumping) {
      if (this.sprite.frameIndex === 2) {
        this.sprite.frameIndex = 0;
      } else {
        this.sprite.frameIndex++;
      }
      //reseteamos frames
      this.frames = 0;
    }
  }
  //resetea la caida
  if (this.hasGravity && this.y >= this.suelo && !this.isJumping) {
    this.yMove = 0;
    this.hasGravity = false;
  }
  //resetea la caida del salto
  if (this.isJumping && this.y >= this.suelo) {
    this.isJumping = false;
    this.yMove = 0;
    this.frames = 0;
    this.sprite.frameIndex = 4;
    setTimeout(function () {
      this.sprite.frameIndex = 0;
    }.bind(this), 200);
  }
}
Player.prototype.collitions = function (obstacle) {

  this.playerHeight = Math.floor(this.sprite.height * this.scale - 4);
  this.playerWidth = Math.floor(this.sprite.width / this.sprite.frames * this.scale);
  this.obstacleHeight = Math.floor(obstacle.cube.height * this.scale);
  this.obstacleWidth = Math.floor(obstacle.cube.width * this.scale);
  //player cordenates
  this.playerLeft = this.x;
  this.playerRight = this.x + this.playerWidth;
  this.playerTop = this.y;
  this.playerBottom = this.y + this.playerHeight;
  //obstacle cordenates
  this.obstacleLeft = obstacle.x;
  this.obstacleRigth = obstacle.x + this.obstacleWidth
  this.obstacleTop = obstacle.y;
  this.obstacleBottom = obstacle.y + this.obstacleHeight;
  //prohibe salir del alto del canvas
  if(this.y <= 0){
    this.y = 0;
  }
  //impide que el player este por debajo del suelo
  if(this.y >= 340){
    this.y = 340;
  }
  //impide poder atravesar un obstaculo al saltar
  if(this.y >= this.obstacleBottom -10 && this.y <= this.obstacleBottom && this.playerRight > this.obstacleLeft +10 && this.playerLeft < this.obstacleRigth-10){
    this.y = this.obstacleBottom;
  }

  if(this.x + Math.floor(this.sprite.width / this.sprite.frames * this.scale) > obstacle.x){
    this.onObstacle = true;
  }else{
    this.onObstacle = false;
  }

  if (this.onObstacle) {
    //comprueba si te puedes mover o te empuja un obstaculo
    if (this.playerRight <= this.obstacleLeft +5 ||
      this.playerLeft >= this.obstacleRigth -5||
      this.playerBottom <= this.obstacleTop ||
      this.playerTop >= this.obstacleBottom) {
      this.canMove = true;
      this.x;
    } else {
      this.canMove = false;
      this.x -= 5
    }
    //salta encima de un obstaculo
    if (this.y + obstacle.cube.height * this.scale < obstacle.y && this.x + this.sprite.height * this.scale > obstacle.x && this.x < obstacle.x + obstacle.cube.width * this.scale) {
      this.suelo = obstacle.y - this.sprite.height * this.scale;
      //actua la gravedad despues de un obstaculo y cae
    } else if (this.y < 340 && this.x > obstacle.x + obstacle.cube.width * this.scale && this.x <= obstacle.x + obstacle.cube.width * this.scale + 3) {
      this.hasGravity = true;
      this.yMove = 1;
      this.suelo = 340;
    }
  }
}

Player.prototype.movements = function () {
  if (this.keys[38]) {
    console.log("jump");
    if (!this.isJumping && this.y) {
      this.isJumping = true;
      this.yMove = -1;
      this.sprite.frameIndex = 4;
      setTimeout(function () {
        this.sprite.frameIndex = 5;
      }.bind(this), 175);
      setTimeout(function () {
        this.yMove = 1;
      }.bind(this), 350);
    }
  }

  if (this.keys[37]) {
    if (this.canMove && this.x >= 0) {
      this.x -= 5;
    }
  }
  if (this.keys[39] /*&& this.y == 340*/) {
    if (this.canMove && this.x + this.sprite.width / this.sprite.frames * this.scale <= 800) {
      this.x += 5;
    }
  }
}

Player.prototype.onKeyDown = function (e) {
    this.keys[e.keyCode] = true;
}

Player.prototype.onkeyup = function (e){
      this.keys[e.keyCode] = false;
}