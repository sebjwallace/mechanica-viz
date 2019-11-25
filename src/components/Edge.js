import React from 'react'
import r from 'rithmic'

import Attach from './Attach'
import './Edge.scss'

const Edge = ({
  id,
  state,
  points
}) => {

  const path = `M ${points[0].x} ${points[0].y} ` + points.map(({ x, y }, i) => {
    return `${x} ${y} `
  }).join('L')

  return <g
    key={path}
    pointerEvents={state.idle ? 'stroke' : 'none'}
    className="Edge"
  >
    <defs>
      <marker
        id="head"
        orient="auto"
        markerWidth="3"
        markerHeight="6"
        refX="4"
        refY="3"
      >
        <path
          d="M0,0 V6 L3,3 Z"
          fill="gray"
        />
      </marker>
    </defs>    
    <path
      markerEnd="url(#head)"
      strokeWidth="2"
      fill="none"
      stroke="gray"  
      d={path}
    />
    {
      points.map(({ x, y }, i) => {
        if(i === 0) return
        return <line
          x1={points[i-1].x}
          y1={points[i-1].y}
          x2={x}
          y2={y}
          stroke="transparent"
          strokeWidth={5}
          onMouseDown={e => r.send({
            event: 'edgeMouseDown',
            payload: { ...e, selectedPoint: i, id }
          })}
        />
      })
    }
  </g>

}

export default Attach(Edge)