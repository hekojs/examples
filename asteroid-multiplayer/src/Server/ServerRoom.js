import HekoMultiplayer from '@hekojs/multiplayer-server'
import HekoControls from '@hekojs/controls'
import Entities from '../Entities'
import RoomState from './RoomState'
import World from '../World'
import Systems from '../Systems'

const board = {
  width: 1280,
  height: 720
}

export default class extends HekoMultiplayer.Room {
  players = {}

  _createWorld() {
    const world = World.create('server')

    // Add the client mulitplayer plugin
    world.plugins.add(HekoMultiplayer.Plugin)

    // Stay all of the entities must be contained in the bounds of the game
    world.systems.add(Systems.StayInBounds, { width: board.width, height: board.height })

    // Handle the collisions (explosions of ship, asteroids etc ...)
    world.systems.add(Systems.Collisions)

    // Add the controls system for moving all controlled entities
    world.systems.add(HekoControls.Systems.ControlsComputeActions)

    world.start()

    return world
  }

  onCreate () {
    this.setPatchRate(150)

    this.world = this._createWorld()
    const state = new RoomState()

    this.inject(this.world, state)
    this.setState(state)

    setInterval(() => {
      if(this.world.entities.all().length < 50) {
        this._createAsteroid()
      }
    }, 5000)

    for (let i = 0; i < 20; i++) {
      this._createAsteroid()
    }
  }

  _createAsteroid () {
    this.world.entities.add(Entities.Asteroid, {
      x: Math.random() * board.width,
      y: 0,
      velocity: {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        angle: Math.random() - 0.5
      },
      sides: Math.round(5 + Math.random() * 2),
      radius: Math.round(10 + Math.random() * 40),
    })
  }

  _createShip (id) {
    return this.players[id] = this.world.entities.add(Entities.Ship, {
      player: id,
      x: board.width / 2,
      y: board.height / 2
    })
  }

  onJoin (client, options, auth) {
    this._createShip(client.sessionId)
  }

  onLeave (client, consented) {
    this.players[client.sessionId].remove()
    delete this.players[client.sessionId]
  }
}