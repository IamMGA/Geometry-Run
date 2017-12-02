

function Game(){
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  this.player = new Player();
  this.map = new Map();
}
Game.prototype.draw = function() {
  this.map.draw();
    this.player.draw();
    //setInterval(this.map.draw, 20);
    // this.map.draw();
    window.requestAnimationFrame(this.draw.bind(this));
}
var game = new Game("canvas");
game.draw();