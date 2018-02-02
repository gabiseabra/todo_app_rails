import { computed } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class TaskLists extends BaseStore {
  get endpoint() { return this.api.likes }

  @computed get validScope() { return Boolean(this.store.users.currentUserId) }

  @computed get pagination() { return this.data.pagination }

  @computed get data() {
    const { taskLists } = this.store
    return taskLists.scopes.get("@@likes") || { pages: {}, pagination: {} }
  }

  getScope(page) {
    const { data, store: { taskLists } } = this
    if(!data.pages[page]) return undefined
    return taskLists.getAll(data.pages[page])
  }

  get props() {
    if(this.validScope) {
      return {
        onLike: this.create,
        onDislike: this.delete
      }
    } else {
      return {}
    }
  }

  @asyncAction async fetchScope(query) {
    const { users, taskLists } = this.store
    if(!users.currentUserId) return
    const { data, pagination } = await this.endpoint.index(users.currentUserId, query)
    taskLists.hydrateCollection({
      query,
      pagination,
      scope: "@@likes",
      data: data.map(x => x.task_list)
    })
  }

  @asyncAction async create(id) {
    const { currentUserId } = this.store.users
    if(!currentUserId) return
    await this.endpoint.create(currentUserId, { task_list_id: id })
    this.setLike(id, true)
  }

  @asyncAction async delete(id) {
    const { currentUserId } = this.store.users
    if(!currentUserId) return
    await this.endpoint.delete(currentUserId, id)
    this.setLike(id, false)
  }

  setLike(id, state) {
    this.store.taskLists.scopes.delete("@@likes")
    this.store.taskLists.registry.get(id).liked = state
  }
}
