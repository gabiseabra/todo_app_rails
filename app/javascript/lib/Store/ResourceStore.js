import _ from "lodash"
import { observable } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class ResourceStore extends BaseStore {
  scopes = observable.map()
  registry = observable.map()

  get(id) { return this.registry.get(id) }

  getAll(ids) {
    if(!ids) return undefined
    return _.compact(ids.map(id => this.get(id)))
  }

  getScopeIds(...args) { return this.scopes.get(this.endpoint.scope(...args)) }

  getScope(...args) { return this.getAll(this.getScopeIds(...args)) }

  get endpoint() { throw new Error("ResourceStore.endpoint() not implemented") }

  hydrateCollection({ data, scope }) {
    const collection = _.keyBy(data, "id")
    this.registry.merge(collection)
    if(scope) {
      this.scopes.set(scope, Object.keys(collection))
    }
  }

  hydrate({ data, scope, id }) {
    this.registry.set(id, data)
    if(this.scopes.has(scope)) {
      const ids = this.scopes.get(scope)
      if(!ids.find(id)) {
        this.scopes.get(scope).push(data.id)
      }
    }
  }

  @asyncAction async fetchScope(...args) {
    const response = await this.endpoint.index(...args)
    this.hydrateCollection(response)
  }

  @asyncAction async fetch(...args) {
    const response = await this.endpoint.show(...args)
    this.hydrate(response)
  }

  @asyncAction async create(...args) {
    const response = await this.endpoint.create(...args)
    this.hydrate(response)
    return response.id
  }

  @asyncAction async update(...args) {
    const response = await this.endpoint.update(...args)
    this.hydrate(response)
  }

  @asyncAction async delete(...args) {
    const { id } = await this.endpoint.delete(...args)
    this.registry.delete(id)
  }
}
