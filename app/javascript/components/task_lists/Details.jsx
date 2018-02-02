import React from "react"
import HiddenIcon from "grommet/components/icons/base/View"
import LikeIcon from "grommet/components/icons/base/Favorite"
import { Button } from "grommet"

const stopPropagation = fun => (e) => {
  e.stopPropagation()
  fun(e)
}

export default function TaskListDetails({ onLike, onDislike, liked, id, ...data }) {
  const likeCb = (liked ? onDislike : onLike)
  const likeFn = likeCb ? stopPropagation(() => likeCb(id)) : undefined
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
          title={liked ? "Unlike" : "Like"}
          icon={<LikeIcon colorIndex={liked ? "brand" : "primary"} />}
          onClick={likeFn} />
      </span>
      <span className="TaskLists-Details--progress">
        {data.progress_checked}/{data.progress_total}
      </span>
    </div>
  )
}
