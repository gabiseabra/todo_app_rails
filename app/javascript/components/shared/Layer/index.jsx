import React from "react"
import { Layer } from "grommet"

export default function AppLayer(props) {
  return (
    <Layer
      flush
      closer
      overlayClose
      align="center"
      className="Shared-Layer"
      {...props} />
  )
}
