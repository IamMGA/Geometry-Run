var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Background(){
  this.x = canvas.width;
  this.y = 0;
  this.img = new Image();
  this.img.src = "images/background.png";
  this.img.isReady = false;
  this.img.onload = function () {
    this.img.isReady = true;
  }.bind(this);
}
Background.prototype.draw = function(){

  if (this.img.isReady) {
    if (this.x <= 0) {
      this.x = canvas.width;
    }
    if (this.x <= canvas.width) {
      ctx.drawImage(this.img, this.x -this.img.width, this.y, this.img.width, this.img.height);
    }
    
    // ctx.beginPath();
    // ctx.moveTo(this.x,0);
    // ctx.lineWidth = 5
    // ctx.lineTo(this.x,600);
    // ctx.stroke();

    ctx.drawImage(this.img, this.x, this.y,this.img.width, this.img.height);
  
    this.x -= 0.5; //incremento de la x para dar movimiento a la imagen
  }

}