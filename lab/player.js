// var player = {
//   x: 0,
//   y: 500,
//   moveUp:    function() { this.y -= 25 },
//   moveLeft:  function() { this.x -= 25 },
//   moveRight: function() { this.x += 25 },
// }

// function draw(player){
//   var img = new Image();
//   img.src ="images/IronRobot.png"
//   var scale = 0.1;
//   img.onload = function(){
//     ctx.drawImage(img, this.x, this.y, img.width * scale, img.height * scale);
//   }.bind(player);
//   img.src ="images/IronRobot.png"
// }

// document.onkeydown = function(e){
//   switch (e.keyCode) {
//     case 38: player.moveUp();    console.log('up',    player); break;
//     case 37: player.moveLeft();  console.log('left',  player); break;
//     case 39: player.moveRight(); console.log('right', player); break;
//   }
//   updateCanvas();
// }

// function updateCanvas() {
//   ctx.clearRect(0,0,800,600);
//   draw(player);
// }
// updateCanvas()

/************************************************************************************************************************/
var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Player(){
  this.x = 0;
  this.y = 500;
}

Player.prototype.draw = function(){
  var img = new Image();
  img.src ="images/IronRobot.png"
  var scale = 0.1;
  img.onload = function(){
    ctx.drawImage(img, this.x, this.y, img.width * scale, img.height * scale);
  }.bind(this);
  img.src ="images/IronRobot.png"
}

// Player.prototype.moveUp = function(){
//   this.y -= 25;
// }

Player.prototype.moveLeft = function(){
  this.x -= 25;
}

Player.prototype.moveRight = function(){
  this.x += 25;
}

Player.prototype.onkeydown = function(e){
  debugger;
  switch (e.keyCode) {
    // case 38: this.moveUp();    console.log('up',    this); break;
    case 37: this.moveLeft();  console.log('left',  this); break;
    case 39: this.moveRight(); console.log('right', this); break;
  }
  this.updateCanvas();
}

Player.prototype.updateCanvas = function(){
  ctx.clearRect(0,0,800,600);
  this.draw();
}

// function Player () {
//   var canvas = document.getElementById('canvasId');
//   var ctx = canvas.getContext('2d');
//   this.x = 0;
//   this.y = 500;

// }
// Player.prototype.moveUp =    function() { this.y -= 25 };
// Player.prototype.moveLeft =  function() { this.x -= 25 };
// Player.prototype.moveRight = function() { this.x += 25 };


// Player.prototype.draw = function(){
//   var img = new Image();
//   img.src ="images/IronRobot.png"
//   var scale = 0.1;
//   img.onload = function(){
//     ctx.drawImage(img, this.x, this.y, img.width * scale, img.height * scale);
//   }.bind(Player);
//   img.src ="images/IronRobot.png"
// }



// Player.prototype.onkeydown = function(e){
//   switch (e.keyCode) {
//     case 38: this.moveUp();    console.log('up',    this); break;
//     case 37: this.moveLeft();  console.log('left',  this); break;
//     case 39: this.moveRight(); console.log('right', this); break;
//   }
//   this.updateCanvas();
// }


// Player.prototype.updateCanvas = function(){
//   ctx.clearRect(0,0,800,600);
//   this.draw();
// }


