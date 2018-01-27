import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import ApiClient from "@/lib/ApiClient"
import Store from "@/lib/Store"
import Shell from "@/components/views/Shell"

const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute('content')

const apiClient = new ApiClient("/api", { csrfToken })

const store = new Store({ apiClient })

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Shell />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
