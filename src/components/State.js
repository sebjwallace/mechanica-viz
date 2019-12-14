import React from 'react'

import { calcTextWidth } from '../utils/svg.util'
import './State.scss'

export default ({
  state,
  data: {
    id,
    view: {
      x, y, width, height
    }
  },
  send,
  machine
}) => {

  const handleRadius = 4
  const fontSize = 14
  const textWidth = calcTextWidth(id, '"Roboto"', fontSize)
  const textX = x + (width / 2) - (textWidth / 2)
  const textY = y + (height / 2) + (fontSize / 3)
  const fill = state.selected || state.active ? "lightgray": "white"
  const interfaceDiameter = 4
  const interfaceRadius = interfaceDiameter / 2

  const handles = [
    {
      x,
      y,
      position: 'TL'
    },
    {
      x: x + width,
      y,
      position: 'TR'
    },
    {
      x,
      y: y + height,
      position: 'BL'
    },
    {
      x: x + width,
      y: y + height,
      position: 'BR'
    }
  ]

  const interfaceMouseDown = position => e => {
    e.stopPropagation()
    send({
      event: 'interfaceMouseDown',
      payload: {
        ...e,
        stateId: id,
        position
      }
    })
  }

  return <g
    className="State"
    onMouseDown={e => {
      // send(!e.ctrlKey && { event: 'deselectAllNodes' })
      machine.receive({ event: 'stateMouseDown' })
      send({ event: 'selectState', payload: { id } })
      e.stopPropagation()
    }}
    onMouseUp={() => {
      machine.receive({ event: 'stateMouseUp' })
      send({ event: 'PATCH:state/mouse-up' })
    }}
  >
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke="gray"
      strokeWidth={2}
    />
    <text
      x={textX}
      y={textY}
      fontSize={fontSize}
    >
      { id }
    </text>
    <rect
      className="interface"
      x={x-interfaceRadius}
      y={y}
      width={interfaceDiameter}
      height={height}
      onMouseDown={interfaceMouseDown('left')}
    />
    <rect
      className="interface"
      x={x+width-interfaceRadius}
      y={y}
      width={interfaceDiameter}
      height={height}
      onMouseDown={interfaceMouseDown('right')}
    />
    <rect
      className="interface"
      x={x}
      y={y-interfaceRadius}
      width={width}
      height={interfaceDiameter}
      onMouseDown={interfaceMouseDown('top')}
    />
    <rect
      className="interface"
      x={x}
      y={y+height-interfaceRadius}
      width={width}
      height={interfaceDiameter}
      onMouseDown={interfaceMouseDown('bottom')}
    />
    {
      state.selected && handles.map(({ x, y, position }) => <circle
        key={`handle-${x}-${y}`}
        cx={x}
        cy={y}
        r={handleRadius}
        fill="gray"
        strokeWidth={1}
        stroke="gray"
        onMouseDown={(e) => {
          send({event:'stateCpMouseDown', payload: { ...e, position, id }})
          e.stopPropagation()
        }}
        onMouseUp={() => send({event: 'mouseUp'})}
      />)
    }
  </g>

}