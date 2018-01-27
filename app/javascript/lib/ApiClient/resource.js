import _ from "lodash/fp"
import encoded from "form-urlencoded"

const METHODS = {
  async index($) {
    return this.fetch(`/${$}.json`)
  },
  async show($, id) {
    return this.fetch(`/${$}/${id}.json`)
  },
  async create($, data) {
    const body = _.flow(
      _.mapKeys(_.snakeCase),
      encoded
    )(data)
    return this.fetch(`/${$}.json`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      }),
      body
    })
  }
}

const pickMethods = _.pick(METHODS)

export default function createResource(api, name, methods = null) {
  const result = methods ? pickMethods(methods) : { ...METHODS }
  return _.mapValues(fun => fun.bind(api, name))(result)
}
