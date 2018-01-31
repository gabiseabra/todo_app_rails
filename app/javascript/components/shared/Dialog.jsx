import React from "react"
import ReactDOM from "react-dom"
import { Box, Button } from "grommet"
import Layer from "./Layer"


export default function Dialog({ children, title, critical, buttonLabel, onCancel, onConfirm }) {
  return (
    <Layer title={title} onClose={onCancel}>
      <Box
        className="Shared-Dialog--content"
        pad="medium">
        {children}
      </Box>
      <Box
        className="Shared-Dialog--controls"
        direction="row"
        justify="end"
        pad="medium">
        <Button
          label="Cancel"
          onClick={onCancel} />
        <Button
          critical={critical}
          label={buttonLabel}
          onClick={onConfirm} />
      </Box>
    </Layer>
  )
}

Dialog.defaultProps = {
  critical: false,
  buttonLabel: "Ok"
}

export function confirm(props) {
  const target = document.createElement("div")
  target.id = "shared-dialog-app"
  document.body.appendChild(target)
  const onCancel = () => {
    ReactDOM.unmountComponentAtNode(target)
    target.parentNode.removeChild(target)
  }
  const onConfirm = () => {
    if(props.onConfirm) props.onConfirm()
    onCancel()
  }
  ReactDOM.render(
    <Dialog {...props} onCancel={onCancel} onConfirm={onConfirm} />,
    target
  )
}
