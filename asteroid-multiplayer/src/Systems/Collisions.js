import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoAudio from '@hekojs/audio'
import HasOwner from '../Components/HasOwner'

const Events = HekoPhysics.Matter.Events

export default class Collisions extends Heko.System {
  onAdd() {
    const world = this.getWorld()
    this.matter = world.plugins.get(HekoPhysics.Plugin).matter
    this.audio = world.plugins.get(HekoAudio.Plugin)
  }

  onTick () {
    const world = this.getWorld()

    Events.on(this.matter, 'collisionStart', (event) => {
      const pairs = event.pairs

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i]

        const entityA = world.entities.get(pair.bodyA._entityId)
        const entityB = world.entities.get(pair.bodyB._entityId)

        if(entityA && entityA.getBuilder().name === 'Projectile') this.handleProjectileCollision(entityA, entityB)
        else if(entityB && entityB.getBuilder().name === 'Projectile') this.handleProjectileCollision(entityB, entityA)
      }
    })
  }

  handleProjectileCollision(projectile, target) {
    const targetName = target.getBuilder().name

    if(targetName === 'Ship') {
      if(projectile.getComponent(HasOwner).value !== target.getComponent(HasOwner).value) {
        this.audio.play('explosion')

        projectile.remove(false)
        target.remove(false)
      }
    } else if(targetName === 'Asteroid') {
      this.audio.play('explosion')

      projectile.remove()
      target.remove()

      // projectile.remove()
      // target.remove()
    }
  }
}