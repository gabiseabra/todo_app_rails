import _ from "lodash/fp"
import BaseStore, { asyncAction } from "./BaseStore"

export default class TaskLists extends BaseStore {
  get endpoint() { return this.api.likes }

  get valid() { return Boolean(this.store.users.currentUserId) }

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

  @asyncAction async create(task_list_id) {
    const { currentUserId } = this.store.users
    if(!currentUserId) return
    await this.endpoint.create(currentUserId, { task_list_id })
    this.store.taskLists.scopes.delete("@@likes")
  }

  @asyncAction async delete(id) {
    await this.endpoint.delete(id)
    this.store.taskLists.scopes.delete("@@likes")
  }
}
