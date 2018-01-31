import _ from "lodash/fp"
import { Component } from "react"

export default class ResourceComponent extends Component {
  constructor(props) {
    super(props)
    _.flow(
      _.pick(this.state.keys()),
      this.state.merge
    )(props)
  }

  state = {}

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  // onChange for checkboxes
  onCheck = ({ target }) => {
    this.setState({ [target.name]: Boolean(target.checked) })
    this.onSubmit()
  }

  onSubmit = () => {
    const { onCreate, onUpdate, id } = this.props
    if(this.exists) onUpdate(id, this.state)
    else onCreate(this.state)
  }

  onDelete = () => {
    const { onDelete, id } = this.props
    onDelete(id)
  }

  get exists() { return !this.props.new }
}
