

function Game() {
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;
  this.x = canvas.width;
  this.y = 340;
  this.frames = 0;
  this.myObstacles = [];
  setInterval(this.addObstacle.bind(this), 5000);

  this.player = new Player();
  this.floor = new Floor();
  this.background = new Background();
}

Game.prototype.clear = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.addObstacle = function(){
  this.myObstacles.push(new Obstacles())
  console.log(this.myObstacles.length);
}

Game.prototype.draw = function () {
  for(var i = 0; i < this.myObstacles.length; i++){
    this.player.collitions(this.myObstacles[i]);
  }
  this.frames++;
  this.clear();
  this.background.draw();
  this.floor.draw();
  this.player.gravity();
  this.player.draw();

  for (var i = 0; i < this.myObstacles.length; i++) {
    this.myObstacles[i].cubes();
  }

  window.requestAnimationFrame(this.draw.bind(this));
}
var game = new Game("canvas");
game.draw();