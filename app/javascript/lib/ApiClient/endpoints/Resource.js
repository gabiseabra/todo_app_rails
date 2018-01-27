import Endpoint from "./Endpoint"

export default class Resource extends Endpoint {
  constructor(api, name) {
    this.name = name
  }

  async index() {
    return this.fetch(`/${this.name}.json`)
  }

  async show(id) {
    return this.fetch(`/${this.name}/${id}.json`)
  }

  async create(body) {
    return this.fetch(`/${this.name}.json`, {
      method: "POST",
      body
    })
  }
}
