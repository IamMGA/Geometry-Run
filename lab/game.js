function Game() {
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;
  this.x = canvas.width;
  this.y = 340;

  //Contador de puntos
  this.points = 0;
  this.myObstacles = [];

  //Se añaden en un intervalo para poder tener espacio entre ellos
  setInterval(this.addObstacle.bind(this), 750);

  this.player = new Player();
  this.floor = new Floor();
  this.background = new Background();
}

//Muestra la puntuacion en el centro
Game.prototype.score = function () {
  ctx.font = '18px serif';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.strokeRect(345, 30, 100, 27);
  ctx.fillText('Score: ' + this.points, 350, 50);
}

//Borra el lienzo
Game.prototype.clear = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Prototipo para añadir obstaculos
Game.prototype.addObstacle = function(){
  this.myObstacles.push(new Obstacles())
  console.log(this.myObstacles.length);
}

//Pintado general
Game.prototype.draw = function () {
  this.player.movements();

  //Recorremos el array de obstáculos
  for(var i = 0; i < this.myObstacles.length; i++){
    this.player.collitions(this.myObstacles[i]);
    if(this.myObstacles[i].x ==  0){
      //Si el jugador se sale negativamente del canvas deja de contar puntos
      if(this.player.x > 0){
        this.points++;
      }
    }
    //Borra la primera posicion del array 
    if(this.myObstacles[i].x ==  -140){
      this.myObstacles.shift();
    }
  }
  this.clear();
  this.background.draw();
  this.floor.draw();

  if(this.player.x >0){
    this.player.draw();
  }
  this.score();

  //Pinta los obstaculos
  for (var i = 0; i < this.myObstacles.length; i++) {
    this.myObstacles[i].cubes();
  }

  //Fin del juego
  if(this.player.x == 0){
    alert("Game Over with " + this.points + " points")
    this.player.x = -10
  }
  window.requestAnimationFrame(this.draw.bind(this));
}
// var game = new Game("canvas");
// game.draw();