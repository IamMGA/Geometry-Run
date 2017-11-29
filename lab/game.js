

function Game(){
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  this.player = new Player();
  this.player.updateCanvas();
}
Game.prototype.draw = function() {
    this.player.updateCanvas();
}
var game = new Game("canvas");
game.draw();