import * as RAPIER from "@dimforge/rapier3d";
import * as THREE from "three/webgpu";

import { EntitieType, PhysicalDescription } from "../types/PhysicsType";
import { Game } from "./Game";

export class Physics {
  private game: Game

  public world: RAPIER.World;
  public gravity: THREE.Vector3;

  public entities: EntitieType[];
  public eventQueue: RAPIER.EventQueue

  constructor() {
    this.game = new Game()

    this.gravity = new THREE.Vector3(0, -9.81, 0);
    this.world = new RAPIER.World(this.gravity);


    // Contain all colliders
    this.entities = [];
    this.eventQueue = new RAPIER.EventQueue(true)

    this.handleIntersection = this.handleIntersection.bind(this)
  }

  addEntity(
    physicalDesc: PhysicalDescription,
    visual: THREE.Mesh,
  ): EntitieType {

    // Create a new Entitie
    const entitie: EntitieType = {
      physics: this.getPhisical(physicalDesc),
      visual,
    };

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
        : physicalDesc.type === "kinematicPositionBased" ?
          RAPIER.RigidBodyDesc.kinematicPositionBased()
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
      
      if(collider.isSensor){
        colliderDesc.setSensor(true)
        colliderDesc.setMass(0)
      }

      colliderDesc.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)


      this.world.createCollider(colliderDesc, rigidBody);
    });

    return rigidBody;
  }

  update() {
    this.world.step(this.eventQueue);
    this.handleIntersection()

    // Update entities to fit visual and physics entitie
    this.entities.forEach((entitie) => {
      if (entitie.visual) {
        entitie.visual.position.copy(entitie.physics.translation());
        entitie.visual.quaternion.copy(entitie.physics.rotation());
      }
    });
  }

  handleIntersection(){
    this.eventQueue.drainCollisionEvents((first, second, intersection) => {
      if(intersection){
        const collider1 = this.world.bodies.get(first)
        const collider2 = this.world.bodies.get(second)

        if(first === 5e-324 || second === 5e-324){
          const fingerPointing = this.game.player.collisionEntities.find(collider => collider.name === "fingerPointing")

          if(fingerPointing) fingerPointing.callback(collider2, this.game)

        }
      }
    })
  }

}
