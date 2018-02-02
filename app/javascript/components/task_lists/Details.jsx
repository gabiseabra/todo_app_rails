import React from "react"
import HiddenIcon from "grommet/components/icons/base/View"
import { Button } from "grommet"

export default function TaskListDetails(data) {
  return (
    <div className="TaskLists-Details">
      {!data.public &&
      <span>
        <Button
          title="Private"
          icon={<HiddenIcon />} />
      </span>}
      <span className="TaskLists-Details--progress">
        {data.progress_checked}/{data.progress_total}
      </span>
    </div>
  )
}
