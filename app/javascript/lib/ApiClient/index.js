import autobind from "autobind-decorator"
import resource from "./resource"

export default class ApiClient {
  constructor(url) {
    this.url = url
    this.users = resource(this, "users")
  }

  @autobind
  async fetch(path, options = {}) {
    const url = `${this.url}${path}`
    const response = await window.fetch(url, {
      credentials: "same-origin",
      ...options
    })
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response
  }

  @autobind
  async json(...props) {
    return this.fetch(...props).json()
  }
}
