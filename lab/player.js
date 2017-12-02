var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Player() {
  this.x = 0;
  this.y = 450;
  this.jumps = 200;
  this.img = new Image();
  this.img.isReady = false;
  this.img.src = "images/IronRobot.png"
  this.img.onload = function () {
    this.img.isReady = true;
  }.bind(this);
  document.onkeydown = this.onKeyDown.bind(this);
}

Player.prototype.draw = function () {
  this.scale = 0.1;
  ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
}

Player.prototype.jump = function(){
  this.y -= 25;
}

Player.prototype.moveLeft = function () {
  this.x -= 25;
}

Player.prototype.moveRight = function () {
  this.x += 25;
}

Player.prototype.onKeyDown = function (e) {
  switch (e.keyCode) {
    case 32: this.jump();      console.log('up',    this); break;
    case 37: this.moveLeft();  console.log('left',  this); break;
    case 39: this.moveRight(); console.log('right', this); break;
  }
  this.draw();
}