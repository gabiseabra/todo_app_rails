import { observable, action } from "mobx"

export default class BaseStore {
  @observable loading = false
  @observable valid = false
  @observable error = undefined

  constructor(store, { apiClient }) {
    this.api = apiClient
    this.store = store
  }

  @action invalidate() {
    this.valid = false
  }

  @action dismissError(key) {
    if(this.error) this.error[key] = undefined
  }
}

export function asyncAction(target, name, descriptor) {
  /* eslint-disable no-param-reassign */
  const fun = descriptor.value
  descriptor.value = async function awaitFun(...props) {
    this.loading = true
    this.error = undefined
    this.valid = undefined
    let result
    try {
      result = await fun.call(this, ...props)
    } catch(error) {
      this.error = error
      console.error(error)
    }
    this.loading = false
    if(typeof this.valid === "undefined") this.valid = true
    return result
  }
  return action.bound(target, name, descriptor)
  /* eslint-enable */
}
