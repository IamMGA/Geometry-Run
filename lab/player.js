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
  this.vy = 4;
  this.isJumping = false;

  document.onkeydown = this.onKeyDown.bind(this);
}

Player.prototype.draw = function(){
  this.y += this.yMove;
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
  if (this.isJumping && this.y >= 340) {
    this.isJumping = false;
    this.yMove = 0;
    this.frames = 0;
    this.sprite.frameIndex = 4;
    setTimeout(function () {
    this.sprite.frameIndex = 0;
    }.bind(this), 200);
  }
}

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
      this.isGravity = true;
    }.bind(this), 500);
  }

}

Player.prototype.moveLeft = function () {
  this.x -= 5;
}

Player.prototype.moveRight = function () {
  this.x += 5;
}

Player.prototype.onKeyDown = function (e) {
  switch (e.keyCode) {
    case 32: this.jump();      console.log('up',    this); break;
    case 37: this.moveLeft();  console.log('left',  this); break;
    case 39: this.moveRight(); console.log('right', this); break;
  }
}