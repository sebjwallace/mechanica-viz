import React from 'react'
import r from 'rithmic'

import Attach from './Attach'

const Edge = ({
  id,
  state,
  points
}) => {

  const path = `M ${points[0].x} ${points[0].y} ` + points.map(({ x, y }, i) => {
    return `${x} ${y} `
  }).join('L')

  return <g
    key={path}
    pointerEvents="none"
  >
    <defs>
      <marker
        id="head"
        orient="auto"
        markerWidth="3"
        markerHeight="6"
        refX="4"
        refY="3"
      >
        <path
          d="M0,0 V6 L3,3 Z"
          fill="gray"
        />
      </marker>
    </defs>    
    <path
      markerEnd="url(#head)"
      strokeWidth="2"
      fill="none"
      stroke="gray"  
      d={path}
    /> 
  </g>

}

export default Attach(Edge)