import Endpoint from "./Endpoint"

export default class Devise extends Endpoint {
  constructor(api, name) {
    this.name = name
  }

  async signUp(body) {
    return this.fetch(`/auth.json`, {
      method: "POST",
      body
    })
  }
}
