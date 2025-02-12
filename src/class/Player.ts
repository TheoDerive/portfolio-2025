import * as THREE from "three/webgpu"
import * as RAPIER from "@dimforge/rapier3d"
import { Game } from "./Game"
import { EntitieType } from "../types/PhysicsType"


export class Player{
  private game: Game

  public body: EntitieType
  public SPEED: number

  constructor(){
    this.game = new Game()

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 16),
      new THREE.MeshNormalMaterial()
    )


    this.game.world.scene.add(mesh)

    this.SPEED = 15
    this.body = this.game.physics.addEntity(
      {
        type: "dynamic",
        position: {x: 0, y: 4, z: 0},
        collider: [{ shape: "ball", parameters: [1]}]
      },
      mesh
    )
  }

  update(){
    this.updateMovement()
  }

  updateMovement(){
    const direction = this.game.view.getDirection()

    const currentVelocity = this.body.physics.linvel()
    direction.y = currentVelocity.y
    
    this.body.physics.setLinvel(direction, false)
  }
}
