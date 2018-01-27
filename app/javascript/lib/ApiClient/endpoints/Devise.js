import Endpoint from "./Endpoint"

export default class Devise extends Endpoint {
  async signUp(data) {
    return this.json("/auth.json", {
      method: "POST",
      body: { user: data }
    })
  }

  async signIn(data) {
    return this.fetch("/auth/sign_in.json", {
      method: "POST",
      body: { user: data }
    })
  }

  async signOut() {
    return this.fetch("/sign_out", {
      method: "DELETE"
    })
  }
}
