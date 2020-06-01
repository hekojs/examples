import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class Projectile extends Heko.EntityBuilder {
  create (entity, { x, y }) {
    const body = HekoPhysics.Matter.Bodies.circle(x, y, 1, { isSensor: true, frictionAir: 0 })

    entity
      .addComponent(HekoPhysics.Components.Physics, { body })

    return entity
  }
}