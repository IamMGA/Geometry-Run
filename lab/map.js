function draw(){
  var canvas = document.getElementById('canvasId');
  var ctx = canvas.getContext('2d');
  // var width = canvas.width;
  // var height = canvas.height;
  ctx.fillRect(0, 500, canvas.width , 3);
}
draw();