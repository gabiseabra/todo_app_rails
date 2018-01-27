import autobind from "autobind-decorator"
import { ResponseError, JsonResponseError } from "./errors"
import { Devise, Resource } from "./endpoints"
import parseRequest from "./request"

const CSRF_TOKEN_HEADER = "X-CSRF-Token"

const AUTH_USER_HEADER = "X-User-Email"

const AUTH_TOKEN_HEADER = "X-User-Token"

export default class ApiClient {
  constructor(url, { csrfToken, authToken, currentUser }) {
    this.url = url.replace(/\/$/, "")
    this.csrfToken = csrfToken
    this.auth = {
      token: authToken,
      email: currentUser ? currentUser.email : undefined
    }
    this.authToken = authToken
    this.auth = new Devise(this)
    // this.users = new Resource(this, "users")
  }

  get headers() {
    return {
      [CSRF_TOKEN_HEADER]: this.csrfToken,
      [AUTH_USER_HEADER]: this.auth.email,
      [AUTH_TOKEN_HEADER]: this.auth.token
    }
  }

  request = parseRequest.bind(this)

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
