//Iniciamos el juego mediante un boton

window.onload = function() {
  document.getElementById("start").onclick = function() {
    startGame();
  };

  function startGame() {
    var game = new Game("canvas");
      game.draw();
  }

};