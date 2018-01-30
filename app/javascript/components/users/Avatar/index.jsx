import React from "react"

export default function Avatar({ size, ...props }) {
  return <img {...props} className={`Users-Avatar Users-Avatar--${size}`}  />
}
