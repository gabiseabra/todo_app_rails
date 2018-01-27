import Endpoint from "./Endpoint"

export default class Devise extends Endpoint {
  async signUp(body) {
    return this.json("/auth.json", {
      method: "POST",
      body
    })
  }

  async signIn(body) {
    return this.fetch("/auth/sign_in.json", {
      method: "POST",
      body
    })
  }

  async signOut() {
    return this.fetch("/sign_out", {
      method: "DELETE"
    })
  }
}
