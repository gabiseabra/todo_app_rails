/* eslint-disable no-param-reassign */
import _ from "lodash/fp"
import encoded from "form-urlencoded"

const snakeCaseKeys = _.mapKeys(_.snakeCase)

function prependUrl([ path, init ]) {
  const newPath = path ? `/${path.replace(/^\//, "")}` : ".json"
  return [ this.url + newPath, init ]
}

function authenticate([ path, init ]) {
  const headers = new Headers(this.headers)
  if(init.headers) {
    for(const [ name, value ] of init.headers.entries()) {
      headers.append(name, value)
    }
  }
  return [ path, {
    credentials: "same-origin",
    headers,
    ...init
  } ]
}

function encodeBody([ path, init ]) {
  if(init.body) {
    init.headers.append("Content-Type", "application/x-www-form-urlencoded")
    init.body = _.flow(snakeCaseKeys, encoded)(init.body)
  }
  return [ path, init ]
}

// Apply transformations to request
export default _.flow(
  prependUrl,
  authenticate,
  encodeBody,
  ([ path, init ]) => new Request(path, init)
)
