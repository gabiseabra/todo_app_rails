import _ from "lodash"
import Endpoint from "./Endpoint"

export default class Resource extends Endpoint {
  constructor(api, { name, path, parent, shallow }) {
    super(api)
    this.shallow = shallow
    this.parent = parent || []
    this.path = path || `${name}s` // poor man's inflection
    this.name = name
  }

  scope(...args) {
    const len = this.parent.length
    if(args.length < len) {
      throw new Error(`Invalid scope for ${this.name}. Expected ${len} >= arguments, got ${args.length}.`)
    }
    return _.reduce(this.parent, ($, name, i) => `${$}/${name}/${args[i]}`, "")
  }

  resolveScope(...args) {
    const scope = this.scope(...args)
    const path = `${scope}/${this.path}.json`
    return { scope, path }
  }

  resolveResource(...args) {
    const [ id ] = args.splice(this.parent.length, 1)
    const scope = this.scope(...args)
    let path = (
      this.shallow ?
        `/${this.path}` :
        `${scope}/${this.path}`
    )
    path += `/${id}.json`
    return { id, scope, path }
  }

  async index(...args) {
    const { path, ...data } = this.resolveScope(...args)
    const response = await this.json(path)
    return { ...response, ...data }
  }

  async show(...args) {
    const { path, ...data } = this.resolveResource(...args)
    const response = await this.json(path)
    return { ...response, ...data }
  }

  async create(...args) {
    const [ body ] = args.splice(-1, 1)
    const { path, ...data } = this.resolveScope(...args)
    const response = await this.json(path, {
      method: "POST",
      body: { [this.name]: body }
    })
    return { ...response, ...data }
  }

  async update(...args) {
    const [ body ] = args.splice(-1, 1)
    const { path, ...data } = this.resolveResource(...args)
    const response = await this.json(path, {
      method: "PUT",
      body: { [this.name]: body }
    })
    return { ...response, ...data }
  }

  async delete(...args) {
    const { path, ...result } = this.resolveResource(...args)
    await this.fetch(path, { method: "DELETE" })
    return result
  }
}
