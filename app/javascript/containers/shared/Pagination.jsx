import qs from "querystring"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Pagination } from "@/components/shared"

class PaginationApp extends Component {
  onChange = (page) => {
    const { location } = this.props
    const query = location.search ? qs.parse(location.search.slice(1)) : {}
    this.props.push({
      ...location,
      search: qs.stringify({ ...query, page })
    })
  }

  render() {
    return (
      <Pagination {...this.props} onChange={this.onChange} />
    )
  }
}

export default withRouter(PaginationApp)
