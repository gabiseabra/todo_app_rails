export const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")

export const authToken = JSON.parse(document.getElementById("authentication-token").textContent)

export const currentUser = JSON.parse(document.getElementById("authenticated-user").textContent)
