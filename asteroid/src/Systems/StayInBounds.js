import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class StayInBounds extends Heko.System {
  static queries = {
    entities: { components: [HekoPhysics.Components.Physics] }
  }

  onAdd({width, height}) {
    this.width = width
    this.height = height
  }

  onTick () {
    this.queries.entities.results.forEach(entity => {
      const physics = entity.getComponent(HekoPhysics.Components.Physics)

      if (physics.position.x < 0) physics.setPosition({ x: this.width })
      else if (physics.position.x > this.width) physics.setPosition({ x: 0 })
      if (physics.position.y < 0) physics.setPosition({ y: this.height })
      else if (physics.position.y > this.height) physics.setPosition({ y: 0 })
    })
  }
}