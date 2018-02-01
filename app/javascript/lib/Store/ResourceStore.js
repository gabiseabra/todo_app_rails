import _ from "lodash"
import { observable } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class ResourceStore extends BaseStore {
  scopes = observable.map()
  registry = observable.map()

  get(id) { return this.registry.get(id) }

  getAll(ids = []) { return _.compact(ids.map(id => this.get(id))) }

  getScopeIds(...args) { return this.scopes.get(this.endpoint.scope(...args)) }

  getScope(...args) {
    const scope = this.getScopeIds(...args)
    if(!scope) return undefined
    return this.getAll(scope)
  }

  get endpoint() { throw new Error("ResourceStore.endpoint() not implemented") }

  hydrate(collection, scope) {
    this.registry.merge(collection)
    if(scope) {
      this.scopes.set(scope, Object.keys(collection))
    }
  }

  @asyncAction async fetchScope(...args) {
    const { data, scope } = await this.endpoint.index(...args)
    this.hydrate(_.keyBy(data, "id"), scope)
  }

  @asyncAction async fetch(...args) {
    const { data } = await this.endpoint.show(...args)
    this.hydrate({ [data.id]: data })
  }

  @asyncAction async create(...args) {
    const { data, scope } = await this.endpoint.create(...args)
    this.hydrate({ [data.id]: data })
    if(this.scopes.has(scope)) this.scopes.get(scope).push(data.id)
    return data.id
  }

  @asyncAction async update(...args) {
    const { data } = await this.endpoint.update(...args)
    this.hydrate({ [data.id]: data })
  }

  @asyncAction async delete(...args) {
    const { id } = await this.endpoint.delete(...args)
    this.registry.delete(id)
  }
}
