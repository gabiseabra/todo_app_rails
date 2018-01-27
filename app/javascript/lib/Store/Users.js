import { observable, computed } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class Users extends BaseStore {
  @observable currentUserId = undefined
  @observable registry = observable.map()

  get(id) { return this.registry.get(id) }

  get currentUser() { return this.get(currentUserId) }

  @asyncAction async signUp(options) {
    const { data } = await this.api.auth.signUp(options)
    console.log(data)
    this.registry.set(data.id, data)
    this.currentUserId = data.id
  }

  @asyncAction async signIn(options) {
    const { data } = await this.api.auth.signIn(options)
    this.registry.set(data.id, data)
    this.currentUserId = data.id
  }

  @asyncAction async signOut() {
    await this.api.auth.signOut()
    this.currentUser = undefined
  }
}
