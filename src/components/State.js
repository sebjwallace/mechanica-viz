import React, { useState, useEffect } from 'react'
import r from 'rithmic'

import { calcTextWidth } from '../utils/svg.util'
import './State.scss'

const State = ({ id, index, view }) => {

  const [ { controller, state = {} }, setState ] = useState({})

  useEffect(() => {
    const controller = r.create({ schema: 'state', data: { id, index } })
    controller.watch(() => setState({ controller, state: controller.getStates() }))
    setState({ controller })
  }, [])

  const { x, y, width, height, active } = view

  if(!controller) return ''

  const handleRadius = 4

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

  const interfaceMouseDown = e => {
    e.stopPropagation()
    r.send({
      event: 'interfaceMouseDown',
      payload: { ...e, stateIndex: index }
    })
  }

  const fontSize = 14
  const textWidth = calcTextWidth(id, '"Roboto"', fontSize)
  const textX = x + (width / 2) - (textWidth / 2)
  const textY = y + (height / 2) + (fontSize / 3)
  const fill = state.selected || view.active ? "lightgray": "white"
  const interfaceDiameter = 4
  const interfaceRadius = interfaceDiameter / 2

  return <g
    key={id}
    className="State"
    onMouseDown={e => {
      r.send(!e.ctrlKey && { event: 'deselectAllNodes' })
      controller.receive({ event: 'stateMouseDown' })
      r.send({ event: 'selectState', payload: { index } })
      e.stopPropagation()
    }}
    onMouseUp={e => controller.receive({ event: 'stateMouseUp' })}
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
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x+width-interfaceRadius}
      y={y}
      width={interfaceDiameter}
      height={height}
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x}
      y={y-interfaceRadius}
      width={width}
      height={interfaceDiameter}
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x}
      y={y+height-interfaceRadius}
      width={width}
      height={interfaceDiameter}
      onMouseDown={interfaceMouseDown}
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
          controller.receive({event:'stateCpMouseDown', payload: { position }})
          e.stopPropagation()
        }}
        onMouseUp={() => r.send({event: 'mouseUp'})}
      />)
    }
  </g>

}

export default State