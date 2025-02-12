import { Game } from "./class/Game";

import "./style/style.scss";

const game = new Game()

function gameloop(){
  window.requestAnimationFrame(gameloop)

  game.update()
}

gameloop()
