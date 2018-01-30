import { observable, computed } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class ResourceStore extends BaseStore {
  currentIds = observable.array([])
  registry = observable.map()

  get(id) { return this.registry.get(id) }

  @computed
  get current() { return this.currentIds.map(id => this.get(id)) }

  get endpoint() { throw new Error("ResourceStore.endpoint() not implemented") }

  @asyncAction async fetchCurrent(...args) {
    const { data } = await this.endpoint.index(...args)
    this.currentIds = []
    data.forEach((resource) => {
      this.currentIds.push(resource.id)
      this.registry.set(resource.id, resource)
    })
  }

  @asyncAction async fetch(...args) {
    const { data } = await this.endpoint.show(...args)
    this.registry.set(data.id, data)
  }

  @asyncAction async create(...args) {
    const { data } = await this.endpoint.create(...args)
    this.registry.set(data.id, data)
  }

  @asyncAction async update(...args) {
    const { data } = await this.endpoint.update(...args)
    this.registry.set(data.id, data)
  }

  @asyncAction async delete(...args) {
    const [ id ] = args.slice(-1, 1)
    await this.endpoint.delete(...args)
    this.currentTaskListIds.remove(id)
    this.registry.delete(id)
  }
}
