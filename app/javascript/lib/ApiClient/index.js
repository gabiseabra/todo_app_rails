import _ from "lodash/fp"
import encoded from "form-urlencoded"
import autobind from "autobind-decorator"
import { Devise, Resource } from "./endpoints"

const CSRF_TOKEN_HEADER = "X-CSRF-Token"

const snakeCaseKeys = _.mapKeys(_.snakeCase)

export default class ApiClient {
  constructor(url, { csrfToken }) {
    this.url = url.replace(/\/$/, "")
    this.csrfToken = csrfToken
    this.auth = new Devise(this)
    // this.users = new Resource(this, "users")
  }

  // Apply transformations to request
  request = _.flow(
    function prependUrl([ path, init ]) {
      return [ `${this.url}/${path.replace(/^\//, "")}`, init ]
    },
    function authenticate([ path, init ]) {
      const headers = new Headers(this.headers)
      if(request.headers) {
        for(let [ name, value ] of request.headers.entries()) {
          headers.append(name, value)
        }
      }
      return [ path, {
        credentials: "same-origin",
        headers,
        ...init
      } ]
    },
    function encodeBody([ path, init ]) {
      if(init.body) {
        init.headers.append("Content-Type", "application/x-www-form-urlencoded")
        init.body = _.flow(snakeCaseKeys, encoded)(data)
      }
      return [ path, init ]
    },
    ([ path, init ]) => new Request(path, init)
  )

  @autobind
  async fetch(path, init = {}) {
    const response = await window.fetch(this.request([ path, init ]))
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
