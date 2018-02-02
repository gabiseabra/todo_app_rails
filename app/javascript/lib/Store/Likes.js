import _ from "lodash/fp"
import { computed } from "mobx"
import BaseStore, { asyncAction } from "./BaseStore"

export default class TaskLists extends BaseStore {
  get endpoint() { return this.api.likes }

  @computed get validScope() { return Boolean(this.store.users.currentUserId) }

  getPagination(id) { return this.getScopeData(id).pagination }

  getScopeData(id) {
    const { taskLists } = this.store
    return taskLists.scopes.get(`@@likes/${id}`) || { pages: {}, pagination: {} }
  }

  getScope(id, page) {
    const { taskLists } = this.store
    const data = this.getScopeData(id)
    if(!data.pages[page]) return undefined
    return taskLists.getAll(data.page[page])
  }

  @asyncAction async fetchScope(query) {
    const { users, taskLists } = this.store
    if(!users.currentUserId) return
    const { data } = await this.endpoint.index(users.currentUserId, query)
    taskLists.hydrateCollection({
      query,
      scope: "@@likes",
      data: _.map(data, "task_list")
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
    await this.endpoint.delete(this.currentUserId, id)
    this.setLike(id, false)
  }

  setLike(id, state) {
    this.store.taskLists.scopes.delete("@@likes")
    this.store.taskLists.registry.get(id).likes = state
  }
}
