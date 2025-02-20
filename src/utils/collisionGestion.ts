import RAPIER from "@dimforge/rapier3d";
import { Game } from "../class/Game";

export namespace CollisionGestion {
  export function FingerPointing(second: RAPIER.RigidBody, game: Game) {
    if (second.handle === 1e-323 || second.handle === 5e-324) return;
  }
}
