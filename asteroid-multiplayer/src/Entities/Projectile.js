import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoHelpers from '@hekojs/helpers'
import HasOwner from '../Components/HasOwner'

export default class Projectile extends Heko.EntityBuilder {
  create (entity, { x, y, angle, velocity, player }) {
    const body = HekoPhysics.Matter.Bodies.circle(x, y, 1, { isSensor: true, frictionAir: 0 })
    HekoPhysics.Matter.Body.setAngle(body, HekoHelpers.Angle.toRadian(angle))
    HekoPhysics.Matter.Body.setVelocity(body, velocity)

    entity
      .addComponent(HekoPhysics.Components.Physics, { body })
      .addComponent(HasOwner, { value: player })

    return entity
  }
}