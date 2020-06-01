import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoControls from '@hekojs/controls'
import FireProjectile from '../Components/FireProjectile'
import HasOwner from '../Components/HasOwner'

export default class Ship extends Heko.EntityBuilder {
  create (entity, { x, y, player }) {
    entity
      .addComponent(HasOwner, { value: player })
      .addComponent(HekoPhysics.Components.Physics, {
        body: HekoPhysics.Matter.Bodies.fromVertices(x, y, [
          { x: 0, y: 0 },
          { x: -10, y: 30 },
          { x: 10, y: 30 }
        ], {
          frictionAir: 0
        })
      })
      .addComponent(HekoControls.Components.TopDownRotateThrustControl)
      .addComponent(FireProjectile)

    return entity
  }
}