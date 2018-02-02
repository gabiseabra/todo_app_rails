import _ from "lodash"
import qs from "querystring"
import Endpoint from "./Endpoint"

const cleanQuery = $ => _.omitBy($, _.isEmpty)

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
    let id
    let path
    const scope = this.scope(...args)
    if(this.shallow) {
      id = args.shift()
      path = `${this.path}`
    } else {
      id = args.splice(this.parent.length, 1).pop()
      path = `${scope}/${this.path}`
    }
    path += `/${id}.json`
    return { id, scope, path }
  }

  async index(...args) {
    const [ query ] = args.splice(-1, 1)
    const { path, ...data } = this.resolveScope(...args)
    const queryString = query ? qs.stringify(cleanQuery(query)) : ""
    const response = await this.json(`${path}?${queryString}`)
    return { ...response, ...data, query: query || {} }
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
    return { ...response, ...data, id: response.data.id }
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
