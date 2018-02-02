import qs from "querystring"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Pagination } from "@/components/shared"

class PaginationApp extends Component {
  onChange = (page) => {
    const { history, location } = this.props
    const query = location.search ? qs.parse(location.search.slice(1)) : {}
    history.push({
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

export const withPagination = Target => withRouter(({ location, ...props }) => {
  const { page } = location.search ? qs.parse(location.search.slice(1)) : {}
  return <Target {...props} page={page || 1} />
})
