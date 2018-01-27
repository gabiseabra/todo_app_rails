import _ from "lodash"

const METHODS = {
  async index($) {
    return this.fetch(`/${$}.json`)
  },
  async show($, id) {
    return this.fetch(`/${$}/${id}.json`)
  },
  async create($, data) {
    return this.fetch(`/${$}.json`, {
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
