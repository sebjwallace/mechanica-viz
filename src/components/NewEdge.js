import React, { useState } from 'react'

export default ({ startX, startY, onChange = () => {} }) => {

  const [ state, setState ] = useState({
    delta: { x: 0, y: 0 },
    points: [
      { x: startX, y: startY },
      { x: startX, y: startY }
    ]
  })

  const { x, y } = state.points[state.points.length - 1]

  const path = state.points.reduce((path, { x, y }) => {
    return `${path} L ${x} ${y}`
  }, `M ${startX} ${startY}`)

  return <g>
    <path
      d={path}
      strokeWidth={2}
      stroke="gray"
      fill="none"
    />
    <circle
      cx={x}
      cy={y}
      r={100}
      fill="transparent"
      onMouseUp={({ nativeEvent: { offsetX, offsetY } }) => {
        onChange(state.points)
        setState({
          ...state,
          delta: { x: 0, y: 0 },
          points: [
            ...state.points,
            { x: offsetX, y: offsetY }
          ]
        })
      }}
      onMouseMove={({ movementX, movementY, nativeEvent: { offsetX, offsetY } }) => {
        const { x: mx, y: my } = state.points[state.points.length-2]
        const dx = state.delta.x + movementX
        const dy = state.delta.y + movementY
        state.points[state.points.length-1] = {
          x: Math.abs(dx) > Math.abs(dy) ? mx + dx : mx,
          y: Math.abs(dy) > Math.abs(dx) ? my + dy : my
        }
        state.delta = { x: dx, y: dy }
        setState({ ...state })
      }}
    />
  </g>

}