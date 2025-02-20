import * as THREE from "three/webgpu";
import { Game } from "./Game";
import { EntitieType } from "../types/PhysicsType";
import { CollisionEntity } from "../types/PlayerType";
import RAPIER, { RigidBody } from "@dimforge/rapier3d";
import { CollisionGestion } from "../utils/collisionGestion";

export class Player {
  private game: Game;

  public body: EntitieType;
  public collisionEntities: CollisionEntity[];
  public SPEED: number;

  constructor() {
    this.game = new Game();

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 16),
      new THREE.MeshNormalMaterial(),
    );

    this.game.world.scene.add(mesh);

    this.SPEED = 15;
    this.body = this.game.physics.addEntity(
      {
        type: "dynamic",
        position: { x: 0, y: 0.3, z: 0 },
        collider: [{ shape: "ball", parameters: [1], isSensor: false }],
      },
      mesh,
    );

    this.collisionEntities = [
      {
        name: "fingerPointing",
        collision: this.game.physics.getPhisical({
          type: "dynamic",
          position: new THREE.Vector3(),
          collider: [
            { shape: "cuboid", parameters: [9, 3.8, 9], isSensor: true },
          ],
        }),
        dist: 9,
        height: 3.8,
        callback: CollisionGestion.FingerPointing
      },
    ];
  }

  update() {
    this.updateMovement();
    this.updateColliders();

  }

  updateMovement() {
    const direction = this.game.view.getDirection();

    // Apply the y direction value to the physics y velocity
    const currentVelocity = this.body.physics.linvel();
    direction.y = currentVelocity.y;

    this.body.physics.setLinvel(direction, false);
  }

  updateColliders() {
    this.collisionEntities.forEach((collider) => {
      var dist = collider.dist;
      var camPos = new THREE.Vector3();

      this.game.view.camera.getWorldDirection(camPos);

      camPos.multiplyScalar(dist);
      camPos.add(this.game.view.camera.position);

      collider.collision.setTranslation(
        { x: camPos.x, y: collider.height, z: camPos.z },
        false,
      );

      const { y, w } = this.game.view.camera.quaternion
  
      collider.collision.setRotation({x:0, y, z: 0, w}, false);
    });
  }
}
