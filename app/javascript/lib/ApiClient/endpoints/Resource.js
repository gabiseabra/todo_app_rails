import Endpoint from "./Endpoint"

export default class Resource extends Endpoint {
  constructor(api, { name, path, parent, shallow }) {
    super(api)
    this.shallow = shallow
    this.parent = parent || []
    this.path = path || `${name}s` // poor man's inflection
    this.name = name
  }

  resolve(...args) {
    let path = ""
    if(this.parent.length) {
      this.parent.forEach((scope) => {
        path += `/${scope}/${args.shift()}`
      })
    }
    return `${path}/${this.path}`
  }

  resolveScope(...args) {
    return `${this.resolve(...args)}.json`
  }

  resolveResource(...args) {
    const [ id ] = args.splice(this.parent.length, 1)
    const path = (
      this.shallow ?
        `/${this.path}` :
        this.resolve(...args)
    )
    return `${path}/${id}.json`
  }

  async index(...args) {
    return this.fetch(this.resolveScope(...args))
  }

  async show(...args) {
    return this.fetch(this.resolveResource(...args))
  }

  async create(...args) {
    const [ body ] = args.splice(-1, 1)
    return this.fetch(this.resolveScope(...args), {
      method: "POST",
      body: { [this.name]: body }
    })
  }

  async update(...args) {
    const [ body ] = args.splice(-1, 1)
    return this.fetch(this.resolveResource(...args), {
      method: "PUT",
      body: { [this.name]: body }
    })
  }

  async delete(...args) {
    return this.fetch(this.resolveResource(...args), { method: "DELETE" })
  }
}
