

function Game() {
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  this.player = new Player();
  this.floor = new Floor();
  this.background = new Background();
}

Game.prototype.clear = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.draw = function () {
  this.clear();
  this.background.draw();
  this.floor.draw();
  this.player.draw();

  window.requestAnimationFrame(this.draw.bind(this));
}
var game = new Game("canvas");
game.draw();