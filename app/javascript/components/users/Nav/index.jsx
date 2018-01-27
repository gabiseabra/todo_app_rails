import React, { Component } from "react"
import { Button, Layer } from "grommet"
import UserIcon from "grommet/components/icons/base/User"
import Auth from "../Auth"

export default class UserNav extends Component {
  state = {
    active: false
  }

  componentWillReceiveProps({ user }) {
    if(user && this.state.active) {
      this.onToggle(false)
    }
  }

  onToggle = active => this.setState(state => ({
    active: typeof active === "boolean" ? !state.active : active
  }))

  renderGreeting() {
    const { user } = this.props

    return (
      <div>
        Welcome {user.username}
      </div>
    )
  }

  renderLogin() {
    const { active } = this.state

    return (
      <div>
        <Button label="Login" icon={<UserIcon />} onClick={this.onToggle} />
        {active &&
        <Layer closer overlayClose align="center" onClose={this.onToggle}>
          <Auth {...this.props} />
        </Layer>}
      </div>
    )
  }
  render() {
    const { user } = this.props

    return (
      <div>
        {user ? this.renderGreeting() : this.renderLogin()}
      </div>
    )
  }
}
