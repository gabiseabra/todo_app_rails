import Users from "./Users"

export default class AppStore {
  constructor(options) {
    this.users = new Users(options, this)
  }
}
