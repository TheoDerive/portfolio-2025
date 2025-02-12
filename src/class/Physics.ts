import * as RAPIER from "@dimforge/rapier3d";
import * as THREE from "three/webgpu";

import { EntitieType, PhysicalDescription } from "../types/PhysicsType";
import { Game } from "./Game";

export class Physics {
  private game: Game;

  public world: RAPIER.World;
  public gravity: THREE.Vector3;

  public entities: EntitieType[];
  public entitieKey: number;

  constructor() {
    this.game = new Game();

    this.gravity = new THREE.Vector3(0, -9.81, 0);
    this.world = new RAPIER.World(this.gravity);

    this.entities = [];
    this.entitieKey = 0;
  }

  addEntity(
    physicalDesc: PhysicalDescription,
    visual: THREE.Mesh,
  ): EntitieType {
    const entitie: EntitieType = {
      physics: this.getPhisical(physicalDesc),
      visual,
    };

    this.entitieKey++;
    this.entities.push({
      physics: entitie.physics,
      visual: entitie.visual,
    });

    return entitie;
  }

  getPhisical(physicalDesc: PhysicalDescription): RAPIER.RigidBody {
    let rigidBodyDesc =
      physicalDesc.type === "dynamic"
        ? RAPIER.RigidBodyDesc.dynamic()
        : RAPIER.RigidBodyDesc.fixed();

    rigidBodyDesc.setTranslation(
      physicalDesc.position.x,
      physicalDesc.position.y,
      physicalDesc.position.z,
    );

    const rigidBody = this.world.createRigidBody(rigidBodyDesc);

    physicalDesc.collider.forEach((collider) => {
      let colliderDesc: RAPIER.ColliderDesc
      switch (collider.shape) {
        case "cuboid":
          colliderDesc = RAPIER.ColliderDesc.cuboid(
            collider.parameters[0],
            collider.parameters[1],
            collider.parameters[2],
          );
          break;

        case "capsule":
          colliderDesc = RAPIER.ColliderDesc.capsule(
            collider.parameters[0],
            collider.parameters[1],
          );
          break;

        case "ball":
          colliderDesc = RAPIER.ColliderDesc.ball(
            collider.parameters[0],
          );
          break;

        default:
          return


      }
      this.world.createCollider(colliderDesc, rigidBody);
    });

    return rigidBody;
  }

  update() {
    this.world.step();

    this.entities.forEach((entitie) => {
      if (entitie.visual) {
        entitie.visual.position.copy(entitie.physics.translation());
        entitie.visual.quaternion.copy(entitie.physics.rotation());
      }
    });
  }
}
