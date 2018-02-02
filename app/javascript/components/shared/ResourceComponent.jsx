import _ from "lodash"
import { Component } from "react"

const preventDefault = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export default class ResourceComponent extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.attrs)
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  // onChange for checkboxes
  onCheck = async ({ target }) => {
    await this.setState({ [target.name]: Boolean(target.checked) })
    this.onSubmit()
  }

  onCreate = (e) => {
    if(e) preventDefault(e)
    this.props.onCreate(this.state)
  }

  onUpdate = (e) => {
    const { onUpdate, id } = this.props
    if(e) preventDefault(e)
    onUpdate(id, this.state)
  }

  onSubmit = (e) => {
    if(e) preventDefault(e)
    if(_.isEqual(this.state, this.attrs)) return
    if(this.exists) this.onUpdate()
    else this.onCreate()
  }

  onDelete = () => {
    const { onDelete, id } = this.props
    onDelete(id)
  }

  get exists() { return !this.props.new }

  get attrs() { return _.pick(this.props, this.constructor.attrs) }
}
