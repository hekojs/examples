import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class Asteroid extends Heko.EntityBuilder {
  create (entity, {x, y}) {
    entity
      .addComponent(HekoPhysics.Components.Physics, {
        body: HekoPhysics.Matter.Bodies.rectangle(x, y, 20, 20, {
          frictionAir: 0
        })
      })

    return entity
  }
}