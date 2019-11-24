import React from 'react'
import r from 'rithmic'
import Attach from './Attach'
import { portPosition } from '../utils/positioning'

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

  const selected = state.selected
  const fill = selected ? 'lightgray' : 'white'

  return <g key={id}>
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
    />
    {
      selected && ports.map(({ x, y, i, side }) => <rect
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
        // onMouseDown={() => r.send('nodePortMouseDown', { i, side, x, y })}
        // onMouseEnter={() => send('nodePortMouseEnter', { i, side, x, y })}
        // onMouseLeave={() => () => send('nodePortMouseLeave', { i, side, x, y })}
      />)
    }
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