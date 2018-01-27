import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import * as env from "@/env"
import ApiClient from "@/lib/ApiClient"
import Store from "@/lib/Store"
import App from "@/containers/views/App"

const apiClient = new ApiClient("/api", env)

const store = new Store({ apiClient, ...env })

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider {...store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div")),
  )
})
