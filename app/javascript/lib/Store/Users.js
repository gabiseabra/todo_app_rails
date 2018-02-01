import { observable, action } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class Users extends BaseStore {
  @observable currentUserId = undefined
  @observable registry = observable.map()

  get(id) { return this.registry.get(id) }

  get currentUser() { return this.get(this.currentUserId) }

  constructor(store, options) {
    super(store, options)
    this.setCurrentUser(options.currentUser)
  }

  hydrate(collection) { this.registry.merge(collection) }

  @asyncAction async signUp(options) {
    const { data } = await this.api.auth.signUp(options)
    this.setCurrentUser(data)
  }

  @asyncAction async signIn(options) {
    const { data } = await this.api.auth.signIn(options)
    this.setCurrentUser(data)
  }

  @asyncAction async signOut() {
    return this.api.auth.signOut().then(() => this.setCurrentUser(null))
  }

  @action
  setCurrentUser(user) {
    if(user) {
      this.currentUserId = user.id
      this.hydrate({ [user.id]: user })
    } else {
      this.currentUserId = undefined
    }
  }
}
