import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d"

export type PhysicalDescription = {
  type: "dynamic" | "fixed",
  position: {
    x: number,
    y: number,
    z: number
  },
  collider: ColliderType[]
}

export type ColliderType = {
  shape: "cuboid" | "capsule" | "ball",
  parameters: number[]
}

export type EntitieType = {
    physics: RAPIER.RigidBody,
    visual: THREE.Mesh
  }
