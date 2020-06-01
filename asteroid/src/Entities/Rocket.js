import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class Rocket extends Heko.EntityBuilder {
  create (entity, {x, y}) {
    entity
      .addComponent(HekoPhysics.Components.Physics, {
        body: HekoPhysics.Matter.Bodies.circle(x, y, 3, {
          frictionAir: 0
        })
      })

    return entity
  }
}