import React, { useState } from 'react'

export default ({
  sourceX, sourceY,
  targetX, targetY
}) => {

  const [ state, setState ] = useState({})

  const portSize = 5
  const portRadius = portSize / 2
  sourceY = sourceY + portRadius
  targetY = targetY + portRadius
  const width = targetX - sourceX
 
  const lines = [
    {
      x1: sourceX,
      y1: sourceY,
      x2: sourceX + width / 2,
      y2: sourceY
    },
    {
      x1: sourceX + width / 2,
      y1: sourceY,
      x2: sourceX + width / 2,
      y2: targetY
    },
    {
      x1: sourceX + width / 2,
      y1: targetY,
      x2: targetX,
      y2: targetY
    }
  ]

  const key = `edge-${sourceX}-${sourceY}-${targetX}-${targetY}`

  return <g key={key}>
    {
      lines.map(({ x1, y1, x2, y2 }, i) => <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{
          stroke: 'gray',
          strokeWidth: 2
        }}
      />)
    }
    <rect
      x={sourceX}
      y={sourceY - portRadius}
      width={portSize}
      height={portSize}
      style={{
        strokeWidth: 1,
        stroke: 'gray',
        fill: 'gray'
      }}
    />
    <rect
      x={targetX}
      y={targetY - portRadius}
      width={portSize}
      height={portSize}
      style={{
        strokeWidth: 1,
        stroke: 'gray',
        fill: 'gray'
      }}
    />
  </g>

}