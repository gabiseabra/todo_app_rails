import { observable, action } from "mobx"

export default class BaseStore {
  @observable loading = false
  @observable error = undefined

  constructor({ apiClient }, store) {
    this.api = apiClient
    this.store = store
  }
}

export function asyncAction(target, name, descriptor) {
  const fun = descriptor.value
  descriptor.value = async function awaitFun(...props) {
    this.loading = true
    let result
    try {
      result = await fun.call(this, ...props)
    } catch(error) {
      this.error = error
    }
    this.loading = false
    return result
  }
  return action.bound(target, name, descriptor)
}
