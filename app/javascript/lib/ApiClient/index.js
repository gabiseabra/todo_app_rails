import autobind from "autobind-decorator"
import resource from "./resource"

export default class ApiClient {
  constructor(url) {
    this.url = url
    this.users = resource(this, "users")
  }

  @autobind
  async fetch(path, ...props) {
    const url = `${this.url}${path}`
    const response = await window.fetch(url, ...props)
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
