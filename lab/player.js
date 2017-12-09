var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

// function Player() {
//   this.x = 125;
//   this.y = 360;
//   this.jumps = 200;
//   this.yMove = 0;
//   this.isGravity = false;
//   this.vy = 4;
//   this.gravity = 6;
//   this.isJumping = false;
//   this.scale = 0.1;
//   this.img = new Image();
//   this.img.isReady = false;
//   this.img.src = "images/IronRobot.png"
//   this.img.onload = function () {
//     this.img.isReady = true;
//   }.bind(this);
//   document.onkeydown = this.onKeyDown.bind(this);
// }

// Player.prototype.draw = function () {
//   ctx.drawImage(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
//   this.y += this.yMove * this.vy;
//   if(this.isGravity){
//     this.y += this.yMove * this.gravity;
//     this.isGravity = false;
//   }
//   if(this.isJumping && this.y >= 360){
//     this.isJumping = false;
//     this.yMove = 0;
//   }
// }

function Player() {
  this.sprite = new Image();
  this.sprite.src = "images/iron-sprite-all.png";
  this.isReady = false;
  this.sprite.onload = (function() {
    this.isReady = true;
  }).bind(this);
  this.sprite.frames = 8;
  this.sprite.frameIndex = 1;
  this.x = 125;
  this.y = 340;
  this.scale = 0.18;
  this.frames = 0;
  this.yMove = 0;
  this.vy = 8;
  this.isJumping = false;
  this.hasGravity = false;
  this.canMove = true;
  this.suelo = 340;

  document.onkeydown = this.onKeyDown.bind(this);
}

Player.prototype.draw = function(){
  this.y += this.yMove * this.vy;
  // console.log(this.frames);
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
      this.sprite.height * this.scale) ; // destination frame heigth
      this.frames++;
      if(this.frames == 7 && !this.isJumping){
        if (this.sprite.frameIndex === 2) {
          this.sprite.frameIndex = 0;
        } else {
          this.sprite.frameIndex++;
        }
        this.frames = 0;
      }
  }

  if(this.hasGravity && this.y >= this.suelo){
    this.yMove = 0;
  }

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

// Player.prototype.gravity = function(){
//   if (this.hasGravity && !this.isJumping) {
//     this.yMove = 1;
//   }
//   if (this.hasGravity && this.y > this.suelo && this.hasGravity) {
//     this.hasGravity = false;
//     this.yMove = 0;
//   }
// }

Player.prototype.jump = function(){
  console.log("jump");
  if (!this.isJumping){
    this.isJumping = true;
    this.yMove = -1;
    this.sprite.frameIndex = 4;
    setTimeout(function () {
      this.sprite.frameIndex = 5;
    }.bind(this), 200);
    setTimeout(function () {
      this.yMove = 1;
    }.bind(this), 400);
  }

}

// Player.prototype.collitions = function(obstacle){
//   this.playerHeight = Math.floor(this.sprite.height*this.scale -4);
//   this.playerWidth = Math.floor(this.sprite.width/this.sprite.frames*this.scale);
//   this.obstacleHeight = Math.floor(obstacle.cube.height * this.scale);
//   this.obstacleWidth = Math.floor(obstacle.cube.width * this.scale);
//   //player cordenates
//   this.playerLeft = this.x;
//   this.playerRight = this.x + this.playerWidth;
//   this.playerTop = this.y;
//   this.playerBottom = this.y + this.playerHeight;
//   //obstacle cordenates
//   this.obstacleLeft = obstacle.x;
//   this.obstacleRigth = obstacle.x + this.obstacleWidth
//   this.obstacleTop = obstacle.y;
//   this.obstacleBottom = obstacle.y + this.obstacleHeight;


  // if(this.playerRight<=this.obstacleLeft || this.playerBottom <= this.obstacleTop || this.playerLeft >= this.obstacleRigth){
  //   this.canMove = true;
  //   this.x;
  // }else{
  //   this.canMove = false;
  //   this.x-=5;
  // }

  // if (this.playerBottom < this.obstacleTop && this.playerRight > this.obstacleLeft) {
  //   this.suelo = this.obstacleTop - this.playerHeight;
  // }

  // if(this.playerLeft >= this.obstacleRigth && this.playerBottom == this.obstacleTop){
  //   debugger;
  //   this.hasGravity = true;
  //   this.suelo = 340;
  // }
  //else if(this.playerBottom === this.obstacleTop && this.playerLeft > this.obstacleRigth && !this.isJumping && !this.hasGravity){
  //   this.hasGravity = true;
  //   this.suelo = 340;
  // }
// }
Player.prototype.collitions = function (obstacle) {
  if (this.x + this.sprite.width / this.sprite.frames * this.scale <= obstacle.x || this.y + (this.sprite.height * this.scale -4) <= obstacle.y || this.x >= obstacle.x + obstacle.cube.width*this.scale) {
    this.x;
  } else {
    this.x -= 5
  }
  if (this.y + obstacle.cube.height * this.scale < obstacle.y && this.x + this.sprite.height*this.scale > obstacle.x && this.x < obstacle.x + obstacle.cube.width*this.scale) {
    this.suelo = obstacle.y - this.sprite.height * this.scale;
  } else if(this.suelo < 340 && this.x > obstacle.x + obstacle.cube.width*this.scale && !this.isJumping){
    this.hasGravity = true;
    this.yMove = 1;
    this.suelo = 340;
  }
}

Player.prototype.moveLeft = function () {
  if(this.canMove){this.x -= 5}
}

Player.prototype.moveRight = function () {
  if(this.canMove){this.x += 5}
}

Player.prototype.onKeyDown = function (e) {
  switch (e.keyCode) {
    case 32: this.jump();      console.log('up',    this); break;
    case 37: this.moveLeft();  console.log('left',  this); break;
    case 39: this.moveRight(); console.log('right', this); break;
  }
}