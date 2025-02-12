import { InputType } from "../types/InputType";
import { Game } from "./Game";

export class Input {
  private game: Game;

  public keys: InputType[];

  constructor(keys: InputType[]) {
    this.game = new Game();

    this.keys = keys;

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(event: KeyboardEvent) {
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
