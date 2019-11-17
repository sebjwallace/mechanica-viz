import React, { useState } from 'react'

export default ({
  x,
  y,
  width,
  height,
  scale = 1,
  onChange = () => {}
}) => {

  const [ state, setState ] = useState({})

  x = x * scale
  y = y * scale
  width = width * scale
  height = height * scale

  const portSize = 5
  const portRadius = portSize / 2
  const portSpacingX = width / 6
  const portSpacingY = height / 4

  const topPortPosition = (i) => ({
    x: x + portSpacingX * i - portRadius,
    y: y - portRadius
  })

  const bottomPortPosition = (i) => ({
    x: x + portSpacingX * i - portRadius,
    y: y + height - portRadius
  })

  const leftPortPosition = (i) => ({
    x: x - portRadius,
    y: y + portSpacingY * i - portRadius
  })

  const rightPortPosition = (i) => ({
    x: x + width - portRadius,
    y: y + portSpacingY * i - portRadius
  })

  const ports = [
    ...Array.from({ length: 5 }).map((v, i) => topPortPosition(i+1)),
    ...Array.from({ length: 5 }).map((v, i) => bottomPortPosition(i+1)),
    ...Array.from({ length: 3 }).map((v, i) => leftPortPosition(i+1)),
    ...Array.from({ length: 3 }).map((v, i) => rightPortPosition(i+1)),
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
    />
    {
      ports.map(({ x, y }) => <rect
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
      />)
    }
    {
      handles.map(({ x, y, handler }) => <circle
        key={`handle-${x}-${y}`}
        cx={x}
        cy={y}
        r={handleRadius}
        fill="white"
        strokeWidth={1}
        stroke="gray"
        onMouseDown={() => setState({ handler }) && onChange({ mouseMoveHandler: handler })}
        onMouseUp={() => setState({ handler: '' })}
        onMouseMove={handlers[state.handler]}
      />)
    }
  </g>

}