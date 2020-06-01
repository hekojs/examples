import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoAudio from '@hekojs/audio'
import HekoHelpers from '@hekojs/helpers'
import Projectile from '../Entities/Projectile'
import HasOwner from './HasOwner'

export default class FireProjectile extends Heko.Component {
  static attributes () {
    return {
      keyboard: null
    }
  }

  listener = pressed => {
    if(pressed.key === ' ') {
      const multiplayer = this.getWorld().plugins.get('Multiplayer')
      if(multiplayer && multiplayer.isClient()) {
        this.getWorld().plugins.get(HekoAudio.Plugin).play('fire')
        multiplayer.sendMessage(this.getNamespace() + '.fire')
      } else {
        this.fire()
      }
    }
  }

  constructor () {
    super()
  }

  onAdd() {
    const multiplayer = this.getWorld().plugins.get('Multiplayer')
    if(multiplayer && multiplayer.isServer()) {
      multiplayer.onMessage(this.getNamespace() + '.fire', () => {
        this.fire()
      })
    }
  }

  listen (keyboard) {
    this.keyboard = keyboard
    this.keyboard.events.on('pressed', this.listener)
    return this
  }

  stopListening () {
    this.keyboard.events.off('pressed', this.listener)
    this.keyboard = null
    return this
  }

  fire() {
    const thisPhysics = this.getEntity().getComponent(HekoPhysics.Components.Physics)

    const projectile = this.getWorld().entities.add(Projectile, {
      x: thisPhysics.position.x,
      y: thisPhysics.position.y,
      angle: thisPhysics.angle,
      velocity: {
        x: thisPhysics.velocity.x + Math.cos(HekoHelpers.Angle.toRadian(thisPhysics.angle - 90)) * 5,
        y: thisPhysics.velocity.y +Math.sin(HekoHelpers.Angle.toRadian(thisPhysics.angle - 90)) * 5
      },
      player: this.getEntity().getComponent(HasOwner).value
    })

    setTimeout(() => {
      if(projectile.alive) {
        projectile.remove()
      }
    }, 1000)
  }
}