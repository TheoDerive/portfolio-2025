import * as THREE from "three";
import { Game } from "./Game";

export class Debug {
  private game: Game;
  public mesh: THREE.LineSegments;

  constructor() {
    this.game = new Game();

    this.mesh = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xffffff, vertexColors: true }),
    );
    this.mesh.frustumCulled = false;
    this.game.world.scene.add(this.mesh);

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

    // Create the ground mesh
    this.game.physics.addEntity(
      {
        type: "fixed",
        position: { x: 0, y: -1, z: 0 },
        collider: [
          {
            shape: "cuboid",
            parameters: [50, 0.25, 50],
            isSensor: false
          },
        ],
      },
      mesh,
    );

    this.game.world.scene.add(mesh);
  }

  debugging() {
    const { vertices, colors } = this.game.physics.world.debugRender();
    this.mesh.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3),
    );
    this.mesh.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 4),
    );
    this.mesh.visible = true;
  }
}
