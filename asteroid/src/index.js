import './index.html'
import Heko from '@hekojs/core'
import HekoControls from '@hekojs/controls'
import HekoPhysics from '@hekojs/2d-physics'
import HekoRenderer from '@hekojs/2d-renderer'
import Components from './Components'
import Entities from './Entities'
import Systems from './Systems'

Heko.registerComponents(Components)
Heko.registerEntities(Entities)

// Create a new world
const world = new Heko.World()

// Add the physics plugin and configure the matterjs world with the setup method
world.plugins.add(HekoPhysics.Plugin, {
  setup: ({ world }) => {
    world.gravity.y = 0
  }
})

// Add the pixijs renderer plugin enabling statistics and physics debugger showing the matterjs shapes
const renderer = world.plugins.add(HekoRenderer.Plugin, {
  target: document.getElementById('container'),
  drawPhysicsShapes: true,
  statistics: true
})

// Start the world
world.start()

// Stay all of the entities must be contained in the bounds of the game
world.systems.add(Systems.StayInBounds, {
  width: renderer.resolution.x,
  height: renderer.resolution.y
})

// Add the player ship at the center of the screen
const ship = world.entities.add(Entities.Ship, {
  x: renderer.resolution.x / 2,
  y: renderer.resolution.y / 2
})

// Add a new keyboard and give it to the ship control component
const keyboard = new HekoControls.Inputs.Keyboard(world.ticker)
ship.getComponent(HekoControls.Components.TopDownRotateThrustControl).listen(keyboard)
ship.getComponent(Components.FireRocket).listen(keyboard)

// Add the controls system for moving all controlled ships
world.systems.add(HekoControls.Systems.ControlsComputeActions)

// Add many asteroids
for (let i = 0; i < 100; i++) {
  const asteroid = world.entities.add(Entities.Asteroid, {
    x: Math.random() * renderer.resolution.x,
    y: Math.random() * renderer.resolution.y
  })

  // Apply to them a random force at beginning
  asteroid.getComponent(HekoPhysics.Components.Physics).applyForce({
    x: Math.random() * 0.0005 - 0.00025,
    y: Math.random() * 0.0005 - 0.00025
  })
}