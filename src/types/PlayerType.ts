import * as RAPIER from "@dimforge/rapier3d";

export type CollisionEntity = {
  name: string;
  dist: number;
  height: number;
  collision: RAPIER.RigidBody;
  callback: (...args: any) => void
};
