import _ from "lodash"
import { Component } from "react"

export default class ResourceComponent extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.attrs)
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  // onChange for checkboxes
  onCheck = ({ target }) => {
    this.setState({ [target.name]: Boolean(target.checked) })
    this.onSubmit()
  }

  onSubmit = (e) => {
    const { onCreate, onUpdate, id } = this.props
    if(_.isEqual(this.state, this.attrs)) return
    if(this.exists) onUpdate(id, this.state)
    else onCreate(this.state)
    e.preventDefault()
  }

  onDelete = () => {
    const { onDelete, id } = this.props
    onDelete(id)
  }

  get exists() { return !this.props.new }

  get attrs() { return _.pick(this.props, this.constructor.attrs) }
}
