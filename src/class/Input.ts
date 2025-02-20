import { InputType } from "../types/InputType";
import { Game } from "./Game";

export class Input {
  private game: Game;

  public keys: InputType[];

  constructor(keys: InputType[]) {
    this.game = new Game();

    this.keys = keys;

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(event: KeyboardEvent) {
    if(this.game.player.body.physics.isSleeping()){
      this.game.player.body.physics.wakeUp()
    }

    if (event.key === "Shift") {
      this.game.player.SPEED *= 2;
    }

    this.keys.forEach((key) => {
      if (key.keys.includes(event.key)) {
        key.isPressed = true;
      }
    });
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") {
      this.game.player.SPEED /= 2;
    }

    this.keys.forEach((key) => {
      if (key.keys.includes(event.key)) {
        key.isPressed = false;
      }
    });
  }
}
