import React from "react"
import NextIcon from "grommet/components/icons/base/Next"
import PrevIcon from "grommet/components/icons/base/Previous"
import { Box, Button } from "grommet"

export default function Pagination({
  onChange,
  current_page: current,
  total_pages: total
}) {
  // eslint-disable-next-line
  let onPrev, onNext
  if(current > 1) onPrev = () => onChange(current - 1)
  if(current < total) onNext = () => onChange(current + 1)
  return (
    <Box direction="row" align="center" pad="medium" className="Shared-Pagination">
      <span>
        <Button
          title="Previous"
          icon={<PrevIcon />}
          onClick={onPrev} />
      </span>
      <span style={{ flex: "1 1 100%" }} />
      <span style={{ flex: "0 0 auto", margin: "0 10px" }}>
        {current}/{total} pages
      </span>
      <span>
        <Button
          title="Next"
          icon={<NextIcon />}
          onClick={onNext} />
      </span>
    </Box>
  )
}
