import Heko from '@hekojs/core'
import HekoMultiplayer from '@hekojs/multiplayer-server'
import Entities from '../Entities'
import Components from '../Components'
import ServerRoom from './ServerRoom'
import RoomState from './RoomState'

// Register entities and components
Heko.registerEntities(Entities, { env: 'server' })
Heko.registerComponents(Components)

// Register the components and the state we will use in this game
HekoMultiplayer.registerComponentsFromManager()
HekoMultiplayer.registerState(RoomState)

// Create a new server instance ready to get connections and spawn some rooms for players
// (Look at the ServerRoom content for how the room handle the world)
const server = new HekoMultiplayer.Server
server.colyseus.define('default-room', ServerRoom)
server.start()

HekoMultiplayer.Colyseus.matchMaker.createRoom('default-room')