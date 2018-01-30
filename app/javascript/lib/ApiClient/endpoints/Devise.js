import Endpoint from "./Endpoint"

export default class Devise extends Endpoint {
  async signUp(data) {
    return this.json("/auth.json", {
      method: "POST",
      body: { todo_user: data }
    }).then((response) => {
      this.authenticate(response.data)
      return response
    })
  }

  async signIn(data) {
    return this.json("/auth/sign_in.json", {
      method: "POST",
      body: { todo_user: data }
    }).then((response) => {
      this.authenticate(response.data)
      return response
    })
  }

  async signOut() {
    return this.fetch("/auth/sign_out", {
      method: "DELETE"
    }).then((response) => {
      this.authenticate({})
      return response
    })
  }
}
