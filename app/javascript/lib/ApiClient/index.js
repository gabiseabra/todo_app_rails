import url from "url"
import autobind from "autobind-decorator"
import resource from "./resource"

const CSRF_TOKEN_HEADER = "X-CSRF-Token"

export default class ApiClient {
  constructor(url, { csrfToken }) {
    this.url = url
    this.csrfToken = csrfToken
    this.users = resource(this, "users")
  }

  request(input, init = {}) {
    const headers = new Headers(this.headers)
    const request = (input instanceof Request ? input : init)
    let path = (input instanceof Request ? input.path : input)
    if(request.headers) {
      for(let [ name, value ] of request.headers.entries()) {
        headers.append(name, value)
      }
    }
    headers.set(CSRF_TOKEN_HEADER, this.csrfToken)
    const targetUrl = url.resolve(this.url, path.replace(/^\//, ""))
    return new Request(targetUrl, {
      ...request,
      credentials: "same-origin",
      headers
    })
  }

  @autobind
  async fetch(...args) {
    const response = await window.fetch(this.request(...args))
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response
  }

  @autobind
  async json(...args) {
    return this.fetch(...args).json()
  }
}
