import * as THREE from "three";
import { Game } from "./Game";

export class Debug {
  private game: Game;

  public isActive: boolean;

  constructor() {
    this.game = new Game();

    this.isActive = false;

    if (window.location.hash === "#debug") {
      this.isActive = true;
    }

    this.ground();
  }

  ground() {
    const texture = new THREE.TextureLoader().load("testing-texture.webp");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50);

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(100, 0.5, 100),
      new THREE.MeshBasicMaterial({ map: texture }),
    );

    this.game.physics.addEntity(
      {
        type: "fixed",
        position: { x: 0, y: -1, z: 0 },
        collider: [
          {
            shape: "cuboid",
            parameters: [50, 0.25, 50],
          },
        ],
      },
      mesh,
    );

    this.game.world.scene.add(mesh);
  }
}
