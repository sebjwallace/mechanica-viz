import React, { useState } from 'react'

export default ({
  sourceX, sourceY,
  targetX, targetY,
  points,
  onChange = () => {}
}) => {

  const [ state, setState ] = useState({})

  const portSize = 5
  const portRadius = portSize / 2
  sourceY = sourceY + portRadius
  targetY = targetY + portRadius

  const path = points.reduce((path, { x, y }) => {
    return `${path} L ${x} ${y}`
  }, `M ${sourceX} ${sourceY}`) + ` L ${targetX} ${targetY}`

  return <g key={path}>
    <path
      d={path}
      strokeWidth={2}
      stroke="gray"
      fill="none"
    />
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
    {
      points.map(({ x, y }, i) => <circle
        cx={x}
        cy={y}
        r={state.isMouseDown ? 20 : 5}
        fill={state.isVisible ? 'gray' : 'transparent'}
        onMouseEnter={() => setState({ isVisible: true })}
        onMouseLeave={() => setState({ isVisible: false })}
        onMouseDown={() => setState({ isMouseDown: true })}
        onMouseUp={() => setState({ isMouseDown: false })}
        onMouseMove={({ movementX, movementY }) => {
          if(!state.isMouseDown) return
          points[i] = { x: x + movementX, y: y + movementY }
          onChange({ points })
        }}
      />)
    }
  </g>

}