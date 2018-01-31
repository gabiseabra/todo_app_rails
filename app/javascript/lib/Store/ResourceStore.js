import _ from "lodash"
import { observable } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class ResourceStore extends BaseStore {
  scopes = observable.map()
  registry = observable.map()

  get(id) { return this.registry.get(id) }

  getScopeIds(...args) { return this.scopes.get(this.endpoint.scope(...args)) }

  getScope(...args) {
    const scope = this.getScopeIds(...args)
    if(!scope) return undefined
    return _.compact(scope.map(id => this.get(id)))
  }

  get endpoint() { throw new Error("ResourceStore.endpoint() not implemented") }

  @asyncAction async fetchScope(...args) {
    const { data, scope } = await this.endpoint.index(...args)
    const resources = _.keyBy(data, "id")
    this.registry.merge(resources)
    this.scopes.set(scope, Object.keys(resources))
  }

  @asyncAction async fetch(...args) {
    const { data } = await this.endpoint.show(...args)
    this.registry.set(data.id, data)
  }

  @asyncAction async create(...args) {
    const { data, scope } = await this.endpoint.create(...args)
    this.registry.set(data.id, data)
    this.scopes.get(scope).push(data.id)
  }

  @asyncAction async update(...args) {
    const { data } = await this.endpoint.update(...args)
    this.registry.set(data.id, data)
  }

  @asyncAction async delete(...args) {
    const { id } = await this.endpoint.delete(...args)
    this.registry.delete(id)
  }
}
