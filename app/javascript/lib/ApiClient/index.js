import _ from "lodash/fp"
import encoded from "form-urlencoded"
import autobind from "autobind-decorator"
import { ResponseError, JsonResponseError } from "./errors"
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

  get headers() {
    return {
      [CSRF_TOKEN_HEADER]: this.csrfToken
    }
  }

  // Apply transformations to request
  request = _.flow(
    function prependUrl([ path, init ]) {
      return [ `${this.url}/${path.replace(/^\//, "")}`, init ]
    },
    function authenticate([ path, init ]) {
      const headers = new Headers(this.headers)
      if(init.headers) {
        for(let [ name, value ] of init.headers.entries()) {
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
        init.body = _.flow(snakeCaseKeys, encoded)(init.body)
      }
      return [ path, init ]
    },
    ([ path, init ]) => new Request(path, init)
  )

  @autobind
  async fetch(path, init = {}) {
    const request = this.request([ path, init ])
    const response = await window.fetch(request)
    if(!response.ok) {
      throw new ResponseError(response, request)
    }
    return response
  }

  @autobind
  async json(...args) {
    try {
      const response = await this.fetch(...args)
      return response.json()
    } catch(error) {
      if(error instanceof ResponseError) {
        let data
        try { data = await error.response.json() } catch(err) { throw error }
        throw new JsonResponseError(data, error)
      }
      throw error
    }
  }
}
