import Endpoint from "./Endpoint"

export default class Devise extends Endpoint {
  async signUp(data) {
    return this.json("/auth.json", {
      method: "POST",
      body: { todo_user: data }
    }).then((response) => {
      this.api.authenticate(response.data)
      return response
    })
  }

  async signIn(data) {
    return this.json("/auth/sign_in.json", {
      method: "POST",
      body: { todo_user: data }
    }).then((response) => {
      this.api.authenticate(response.data)
      return response
    })
  }

  async signOut() {
    const response = await this.fetch("/auth/sign_out", {
      method: "DELETE"
    })
    this.api.authenticate({})
    return response
  }
}
