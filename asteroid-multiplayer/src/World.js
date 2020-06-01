import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoAudio from '@hekojs/audio'
import Entities from './Entities'
import Components from './Components'

export default {
  create: (env) => {
    // Register entities and components
    Heko.registerEntities(Entities, { env })
    Heko.registerComponents(Components)

    // Create a new world
    const world = new Heko.World()

    // Add the physics plugin and configure the matterjs world with the setup method
    world.plugins.add(HekoPhysics.Plugin, {
      setup: ({ world }) => {
        world.gravity.y = 0
      }
    })

    // Add audio
    world.plugins.add(HekoAudio.Plugin, {
      howls: {
        fire: { src: 'fire.ogg' },
        explosion: { src: 'explosion.ogg' },
      }
    })

    return world
  }
}