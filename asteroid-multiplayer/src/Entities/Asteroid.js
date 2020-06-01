import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class Asteroid extends Heko.EntityBuilder {
  create (entity, { x, y, velocity, sides, radius }) {
    const body = HekoPhysics.Matter.Bodies.polygon(x, y, sides, radius, { restitution: 0.75, frictionAir: 0 })
    HekoPhysics.Matter.Body.setVelocity(body, { x: velocity.x * body.mass, y: velocity.y * body.mass })
    HekoPhysics.Matter.Body.setAngularVelocity(body, velocity.angle * (body.mass / 100))

    entity
      .addComponent(HekoPhysics.Components.Physics, { body })

    return entity
  }
}