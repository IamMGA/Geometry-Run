var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Obstacles(){
  this.x = canvas.width;
  this.y = 340;
  this.scale = 0.18;
  this.cube = new Image();
  this.cube.src = "images/cube.png";
  this.cube.isReady = false;
  this.cube.onload = function () {
    this.cube.isReady = true;
  }.bind(this);
  this.posYRandom()
}
Obstacles.prototype.posYRandom = function(){
  this.random = Math.floor(Math.random() * (3 - 0)) + 0;
  this.randomPos = Math.floor(this.cube.height * this.scale) * this.random;
  return this.y = this.y - this.randomPos;
}

Obstacles.prototype.cubes = function(){
  ctx.drawImage(this.cube, this.x, this.y, this.cube.width * this.scale, this.cube.height * this.scale);
  this.x -= 5;
}