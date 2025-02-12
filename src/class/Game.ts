import { Debug } from "./Debug";
import { Input } from "./Input";
import { Physics } from "./Physics";
import { Player } from "./Player";
import { Time } from "./Time";
import { View } from "./View";
import { Viewport } from "./Viewport";
import { World } from "./World";

let instance: null | Game

export class Game {
  public domElement: HTMLDivElement;

  public debug: Debug
  public input: Input
  public time: Time;
  public physics: Physics;
  public world: World;
  public view: View;
  public viewport: Viewport;
  public player: Player


  constructor() {
    if(instance) return instance;
    instance = this

    this.domElement = document.querySelector(".game")!;

    this.time = new Time();
    this.input = new Input([
      { name: "forward", keys: ["w", "z"], isPressed: false},
      { name: "right", keys: ["d"], isPressed: false},
      { name: "backward", keys: ["s"], isPressed: false},
      { name: "left", keys: ["a", "q"], isPressed: false},
    ])
    this.viewport = new Viewport(this.domElement);
    this.physics = new Physics();
    this.world = new World();
    this.view = new View();
    this.player = new Player()
    this.debug = new Debug()

  }

  update(){
    this.time.update()
    this.physics.update()
    this.world.update()
    this.view.update()
    this.player.update()

    this.viewport.update()
  }
}
