import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d"

export type PhysicalDescription = {
  type: "dynamic" | "fixed" | "kinematicPositionBased",
  position: {
    x: number,
    y: number,
    z: number
  },
  collider: ColliderType[]
}

export type ColliderType = {
  shape: "cuboid" | "capsule" | "ball",
  parameters: number[],
  isSensor: boolean
}

export type EntitieType = {
    physics: RAPIER.RigidBody,
    visual: THREE.Mesh
  }
