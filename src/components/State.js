import React, { useState, useEffect } from 'react'
import r from 'rithmic'

const State = ({ id, view }) => {

  const [ { controller }, setState ] = useState({})

  useEffect(() => {
    const controller = r.create({ schema: 'state', data: { id } })
    setState({ controller })
  }, [])

  const { x, y, width, height } = view

  if(!controller) return ''

  return <g
    key={id}
    onMouseDown={e => controller.receive({ event: 'stateMouseDown' })}
  >
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={controller.is('selected') ? "lightgray": "white"}
      stroke="gray"
      strokeWidth={2}
    />
    <text
      x={x+width/2}
      y={y+height/2}  
    >
      { id }
    </text>
  </g>

}

export default State