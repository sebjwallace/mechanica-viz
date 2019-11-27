import React, { useState, useEffect } from 'react'
import r from 'rithmic'

import './Transition.scss'

const Transition = ({
  id,
  view
}) => {

  const [ { controller, state = {} }, setState ] = useState({})

  useEffect(() => {
    const controller = r.create({ schema: 'transition', data: { id } })
    controller.watch(() => setState({ controller, state: controller.getStates() }))
    setState({ controller })
  }, [])

  const { points } = view

  const path = 'M ' + points.map(({ x, y }, i) => {
    return `${x} ${y} `
  }).join('L')

  return <g
    key={id}
    className="Transition"
    pointerEvents={state.idle ? 'stroke' : 'none'}
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
      markerEnd={state.idle && "url(#head)"}
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
          onMouseDown={e => controller.receive({
            event: 'transitionMouseDown',
            payload: { ...e, selectedPoint: i }
          })}
        />
      })
    }
  </g>
}

export default Transition