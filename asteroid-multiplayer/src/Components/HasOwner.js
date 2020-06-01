import Heko from '@hekojs/core'

export default class HasOwner extends Heko.Component {
  static attributes () {
    return {
      value: null
    }
  }
  static multiplayerSchema = {
    value: 'string'
  }
}