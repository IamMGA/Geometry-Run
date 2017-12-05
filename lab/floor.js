var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

function Floor(){
  this.x = 0;
  this.y = 0;
  this.img = new Image();
  this.img.src = "images/floor.png";
  this.img.isReady = false;
  this.img.onload = function () {
    this.img.isReady = true;
  }.bind(this);
}
Floor.prototype.draw = function(){

  if (this.img.isReady) {
    if (this.x <= 0) {
      this.x = canvas.width;
    }
    if (this.x <= canvas.width) {
      ctx.drawImage(this.img, this.x -this.img.width, canvas.height - this.img.height, this.img.width, this.img.height);
    }
    
    // ctx.beginPath();
    // ctx.moveTo(this.x,0);
    // ctx.lineWidth = 5
    // ctx.lineTo(this.x,600);
    // ctx.stroke();

    ctx.drawImage(this.img, this.x,  canvas.height - this.img.height,this.img.width, this.img.height);
    
  
    this.x -= 5; //incremento de la x para dar movimiento a la imagen
  }

}