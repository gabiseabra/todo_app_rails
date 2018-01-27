import Error from "es6-error"

export class ResponseError extends Error {
  constructor(response, request) {
    super(`[${response.status}] ${response.statusText}`)
    this.request = request
    this.response = response
  }
}

export class JsonResponseError extends ResponseError {
  constructor(data, { request, response }) {
    super(request, response)
    this.data = data
  }
}
