import React from 'react'
import r from 'rithmic'
import Attach from './Attach'

import './Node.scss'

const Node = ({
  state,
  id,
  x,
  y,
  width,
  height,
  scale = 1
}) => {

  x = x * scale
  y = y * scale
  width = width * scale
  height = height * scale

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
      payload: { ...e, id }
    })
  }

  const selected = state.selected
  const fill = selected ? 'lightgray' : 'white'

  return <g key={id} className="Node">
    <rect
      key={id}
      x={x}
      y={y}
      width={width}
      height={height}
      style={{
        strokeWidth: 2,
        stroke: 'gray',
        fill
      }}
      onMouseDown={(e) => {
        r.send([
          !e.ctrlKey && { event: 'deselectAllNodes', payload: { id } },
          { event: 'nodeMouseDown', payload: { ...e, id } }
        ])
        e.stopPropagation()
      }}
      onMouseUp={e => r.send({event: 'nodeMouseUp', payload: { ...e, id } })}
      onMouseEnter={e => r.send({event: 'nodeMouseEnter', payload: { ...e, id } })}
      onMouseLeave={e => r.send({event: 'nodeMouseLeave', payload: { ...e, id } })}
    />
    <rect
      className="interface"
      x={x-2}
      y={y}
      width={4}
      height={height}
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x+width-2}
      y={y}
      width={4}
      height={height}
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x}
      y={y-2}
      width={width}
      height={4}
      onMouseDown={interfaceMouseDown}
    />
    <rect
      className="interface"
      x={x}
      y={y+height-2}
      width={width}
      height={4}
      onMouseDown={interfaceMouseDown}
    />
    {
      selected && handles.map(({ x, y, position }) => <circle
        key={`handle-${x}-${y}`}
        cx={x}
        cy={y}
        r={handleRadius}
        fill="gray"
        strokeWidth={1}
        stroke="gray"
        onMouseDown={(e) => {
          r.send({event:'nodeCpMouseDown', payload: { position }})
          e.stopPropagation()
        }}
        onMouseUp={() => r.send({event: 'mouseUp'})}
      />)
    }
  </g>

}

export default Attach(Node)