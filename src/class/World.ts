import * as THREE from "three/webgpu"
import { Game } from "./Game"

export class World {
  private game: Game

  public scene: THREE.Scene

  constructor(){
    this.game = new Game()

    this.scene = new THREE.Scene()
  }

  update(){
  }
}
