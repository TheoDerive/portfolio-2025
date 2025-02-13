import * as THREE from "three/webgpu";
import { Game } from "./Game";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class View {
  private game: Game;

  public camera: THREE.Camera;
  public controls: PointerLockControls | OrbitControls;

  constructor() {
    this.game = new Game();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.game.viewport.ratio,
      0.1,
      10000,
    );
    this.game.world.scene.add(this.camera);

    this.controls = new PointerLockControls(this.camera, this.game.domElement);

    window.addEventListener("click", () => {
      if(this.controls instanceof PointerLockControls){
        this.controls.lock();
      }
    });
  }

  update() {
      this.camera.position.copy(this.game.player.body.visual.position);
      this.camera.position.y = 3;
  }

  getDirection(): THREE.Vector3 {

    // Init vectors needed
    const direction = new THREE.Vector3(0, 0, 0)
    const frontVector = new THREE.Vector3()
    const sideVector = new THREE.Vector3()

    // Set both directional vectors
    frontVector.set(
      0,
      0,
      Number(this.game.input.keys[2].isPressed) - Number(this.game.input.keys[0].isPressed)
    )

    sideVector.set(
      Number(this.game.input.keys[3].isPressed) - Number(this.game.input.keys[1].isPressed),
      0,
      0,
    )


    // Calcul direction 
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(this.game.player.SPEED)
      .applyEuler(this.camera.rotation)

    // Disable y 
    direction.y = 0
    direction.normalize().multiplyScalar(this.game.player.SPEED)

    return direction
  }
}
