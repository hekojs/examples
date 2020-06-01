import Heko from '@hekojs/core'

export default class HasOwner extends Heko.Component {
  static multiplayer = true
  static attributes () {
    return { value: null }
  }
}