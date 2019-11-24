import React from 'react'
import r from 'rithmic'

import Attach from './Attach'

const Edge = ({
  id,
  points
}) => {

  const portSize = 5
  const portRadius = portSize / 2

  const path = `M ${points[0].x} ${points[0].y} ` + points.map(({ x, y }) => {
    return `${x} ${y} `
  }).join('L')

  return <g key={path}>
    <path
      d={path}
      strokeWidth={2}
      stroke="gray"
      fill="none"
    />
  </g>

}

export default Attach(Edge)