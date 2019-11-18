import React, { useState } from 'react'
import { portPosition } from '../utils/positioning'

export default ({
  x,
  y,
  width,
  height,
  scale = 1,
  onChange = () => {},
  onPortMouseDown = () => {},
  onPortMouseEnter = () => {}
}) => {

  const [ state, setState ] = useState({})

  x = x * scale
  y = y * scale
  width = width * scale
  height = height * scale

  const portSize = 5

  const createPort = (props) => Array.from({ length: props.number }).map((v, i) => ({
    ...props, i,
    ...portPosition({
      ...props, x, y, width, height, i: i + 1
    })
  }))

  const ports = [
    ...createPort({ side: 'top', number: 5 }),
    ...createPort({ side: 'bottom', number: 5 }),
    ...createPort({ side: 'left', number: 3 }),
    ...createPort({ side: 'right', number: 3 })
  ]

  const handleRadius = 4

  const handles = [
    {
      x,
      y,
      handler: 'resizeTL'
    },
    {
      x: x + width,
      y,
      handler: 'resizeTR'
    },
    {
      x,
      y: y + height,
      handler: 'resizeBL'
    },
    {
      x: x + width,
      y: y + height,
      handler: 'resizeBR'
    }
  ]

  const handlers = {
    move: ({ movementX, movementY }) => {
      onChange({ x: x + movementX, y: y + movementY })
    },
    resizeTL: ({ movementX, movementY }) => {
      onChange({
        x: x + movementX,
        y: y + movementY,
        width: width - movementX,
        height: height - movementY
      })
    },
    resizeTR: ({ movementX, movementY }) => {
      onChange({
        y: y + movementY,
        width: width + movementX,
        height: height - movementY
      })
    },
    resizeBL: ({ movementX, movementY }) => {
      onChange({
        x: x + movementX,
        width: width - movementX,
        height: height + movementY
      })
    },
    resizeBR: ({ movementX, movementY }) => {
      onChange({
        width: width + movementX,
        height: height + movementY
      })
    }
  }

  const showControls = state.isMouseOver || state.handler
  const hoverEvents = {
    onMouseEnter: () => setState({ isMouseOver: true }),
    onMouseLeave: () => setState({ isMouseOver: false })
  }

  return <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      style={{
        strokeWidth: 2,
        stroke: 'gray',
        fill: 'white'
      }}
      onMouseDown={() => setState({ handler: 'move' })}
      onMouseUp={() => setState({ handler: false })}
      onMouseMove={handlers[state.handler]}
      { ...hoverEvents }
    />
    {
      showControls && ports.map(({ x, y, i, side }) => <rect
        key={`port-${x}-${y}`}
        x={x}
        y={y}
        width={portSize}
        height={portSize}
        style={{
          strokeWidth: 1,
          stroke: 'gray',
          fill: 'white'
        }}
        onMouseDown={() => onPortMouseDown({ i, side, x, y })}
        onMouseEnter={() => {
          onPortMouseEnter({ i, side, x, y })
          setState({ isMouseOver: true })
        }}
        onMouseLeave={() => setState({ isMouseOver: false })}
      />)
    }
    {
      showControls && handles.map(({ x, y, handler }) => <circle
        key={`handle-${x}-${y}`}
        cx={x}
        cy={y}
        r={handleRadius}
        fill="gray"
        strokeWidth={1}
        stroke="gray"
        onMouseDown={() => setState({ handler }) && onChange({ mouseMoveHandler: handler })}
        onMouseUp={() => setState({ handler: '' })}
        onMouseMove={handlers[state.handler]}
        { ...hoverEvents }
      />)
    }
  </g>

}