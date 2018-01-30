import React from "react"

export default function Avatar({ size, ...props }) {
  return <img {...props} className={`Avatar Avatar--${size}`}  />
}
