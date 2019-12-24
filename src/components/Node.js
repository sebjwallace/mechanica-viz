import React, { useEffect } from 'react'
import Rithmic from 'rithmic'

export default ({ schemaId, id, x, y, radius }) => {

  useEffect(() => {
    const machine = Rithmic.create({ schema: 'Node', payload: { id, schemaId } })
    return () => Rithmic.delete(machine)
  }, [])

  return <g
      className="Node"
      onMouseDown={e => Rithmic.send([{
        event: 'NODE:MOUSE_DOWN',
        payload: { id }
      }, e.stopPropagation()])}
    >
    <circle
      cx={x}
      cy={y}
      r={radius * 1.2}
      fill="#373737"
      stroke="darkgray"
      strokeWidth="1"
    />
    <text
      x={x - radius}
      y={y + 5}
      fontFamily="monospace"
      fontSize="10"
      fill="white"
    >
      { id }
    </text>
  </g>

}