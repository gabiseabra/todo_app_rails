import _ from "lodash"

const METHODS = {
  async index($) {
    return this.fetch(`/${$}`)
  },
  async show($, id) {
    return this.fetch(`/${$}/${id}`)
  },
  async create($, data) {
    return this.fetch(`/${$}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    })
  }
}

export default function createResource(api, name, methods = null) {
  const result = methods ? _.pick(METHODS, methods) : { ...METHODS }
  return _.mapValues(result, fun => fun.bind(api, name))
}
