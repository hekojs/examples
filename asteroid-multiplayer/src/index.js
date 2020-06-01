import './index.html'
import HekoRenderer from '@hekojs/2d-renderer'
import HekoControls from '@hekojs/controls'
import HekoMultiplayer from '@hekojs/multiplayer-client'
import Components from './Components'
import World from './World'

const world = World.create('client')

// Add the pixijs renderer plugin enabling statistics and physics debugger showing the matterjs shapes
world.plugins.add(HekoRenderer.Plugin, {
  target: document.getElementById('container'),
  drawPhysicsShapes: true,
  statistics: true
})

// Add the client mulitplayer plugin
world.plugins.add(HekoMultiplayer.Plugin)

// Start the world
world.start()

// Create a keyboard for controlling our ship and add the controls system for moving all controlled ships
const keyboard = new HekoControls.Inputs.Keyboard(world.ticker)
world.systems.add(HekoControls.Systems.ControlsComputeActions)

// Connect to a server instance and join/create a new default-room
const client = new HekoMultiplayer.connect('ws://localhost:2567')
client.joinOrCreate('default-room').then(room => {
  // Inject the world into the room for entity/component sync
  HekoMultiplayer.inject(world, room)

  world.events.on('added.entity', ({entity}) => {
    // Check if this is our ship that arrives in the game !
    if(
      entity.getBuilder().name === 'Ship' &&
      entity.hasComponent(Components.HasOwner) &&
      entity.getComponent(Components.HasOwner).value === room.sessionId
    ) {

      // Enable controls for moving and fire
      entity.getComponent(HekoControls.Components.TopDownRotateThrustControl).listen(keyboard)
      entity.getComponent(Components.FireProjectile).listen(keyboard)
    }
  })
})