import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class FireRocket extends Heko.Component {
  static multiplayer = true

  static attributes () {
    return {
      keyboard: null
    }
  }

  listener = pressed => {
    if (pressed.key === ' ') {
      const multiplayer = this.getWorld().plugins.get('Multiplayer')
      if (multiplayer && multiplayer.isClient()) {
        multiplayer.sendMessage(this, 'fire')
      } else {
        this.fire()
      }
    }
  }

  constructor () {
    super()
  }

  onAdd () {
    const multiplayer = this.getWorld().plugins.get('Multiplayer')
    if (multiplayer && multiplayer.isServer()) {
      multiplayer.onMessage(this, 'fire', () => {
        this.fire()
      })
    }
  }

  onRemove () {
    this.stopListening()
  }

  listen (keyboard) {
    this.keyboard = keyboard
    this.keyboard.events.on('pressed', this.listener)
    return this
  }

  stopListening () {
    if (this.keyboard) {
      this.keyboard.events.off('pressed', this.listener)
      this.keyboard = null
    }
    return this
  }

  fire () {
    console.log('FIRE !')
  }
}