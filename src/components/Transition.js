import React from 'react'

const Transition = ({
  id,
  view
}) => {

  const { points } = view

  const path = 'M ' + points.map(({ x, y }, i) => {
    return `${x} ${y} `
  }).join('L')

  return <g key={id}>
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

export default Transition