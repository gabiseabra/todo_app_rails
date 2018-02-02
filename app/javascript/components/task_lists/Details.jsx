import React from "react"
import HiddenIcon from "grommet/components/icons/base/View"
import LikeIcon from "grommet/components/icons/base/Favorite"
import { Button } from "grommet"

const stopPropagation = fun => (e) => {
  e.stopPropagation()
  fun(e)
}

export default function TaskListDetails({ onLike, id, ...data }) {
  return (
    <div className="TaskLists-Details">
      {!data.public &&
      <span>
        <Button
          title="Private"
          icon={<HiddenIcon />} />
      </span>}
      <span>
        <Button
          title="Like"
          icon={<LikeIcon />}
          onClick={onLike ? stopPropagation(() => onLike(id)) : undefined} />
      </span>
      <span className="TaskLists-Details--progress">
        {data.progress_checked}/{data.progress_total}
      </span>
    </div>
  )
}
