var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Map(){
  this.x = 0;
  this.y = 0;
  this.img = new Image();
  this.img.src = "images/bg.png";
  this.img.isReady = false;
  this.img.onload = function () {
    this.img.isReady = true;
  }.bind(this);
}
Map.prototype.draw = function(){

  if (this.img.isReady) {
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.x < canvas.width) {
      ctx.drawImage(this.img, this.x -this.img.width, this.y, this.img.width, this.img.height);
    }
    
    ctx.drawImage(this.img, this.x, this.y,this.img.width, this.img.height);
  
    this.x -= 0.5; //incremento de la x para dar movimiento a la imagen
  }

}