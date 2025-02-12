import * as THREE from "three"
import { Game } from "./Game"

export class Viewport {
  private game: Game

  public renderer: THREE.WebGLRenderer
  public ratio: number
  public size: {
    width: number, 
    height: number
  }

  constructor(domElement: HTMLElement){
    this.game = new Game()

    this.renderer = new THREE.WebGLRenderer()
    this.ratio = window.innerWidth / window.innerHeight
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.renderer.setSize( window.innerWidth, window.innerHeight)
    domElement.appendChild(this.renderer.domElement)
  }

  update(){
    this.renderer.render(this.game.world.scene, this.game.view.camera)
  }
}
