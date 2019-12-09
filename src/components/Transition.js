import React from 'react'

import { calcTextWidth } from '../utils/svg.util'

import './Transition.scss'

const Transition = ({
  state,
  data: {
    event,
    view
  },
  send,
  machine
}) => {

  console.log(state)

  const { points } = view

  const [ pointA, pointB ] = points
  const textX = pointA.x + (pointB.x - pointA.x) / 2
  const textY = pointA.y + (pointB.y - pointA.y) / 2
  const fontSize = 10
  const textWidth = calcTextWidth(event, '"Roboto"', fontSize)
  const textPadding = 2
  const pointerEvents = state.idle ? 'stroke' : 'none'
  const stroke = state.selected ? 'black' : 'gray'

  const path = 'M ' + points.map(({ x, y }, i) => {
    return `${x} ${y} `
  }).join('L')

  return <g
    className="Transition"
    onMouseDown={() => send({
      event: 'selectTransition'
    })}
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
      markerEnd={(state.idle || state.selected) && "url(#head)"}
      pointerEvents={pointerEvents}
      strokeWidth="1"
      fill="none"
      stroke={stroke}
      d={path}
    />
    {
      !state.move && points.map(({ x, y }, i) => {
        if(i === 0) return
        return <line
          x1={points[i-1].x}
          y1={points[i-1].y}
          x2={x}
          y2={y}
          stroke="transparent"
          strokeWidth={5}
          onMouseDown={e => machine.receive({
            event: 'transitionMouseDown',
            payload: { ...e, selectedPoint: i }
          })}
        />
      })
    }
    {
      <g
        onMouseDown={e => send({
          event: 'playerEvent',
          payload: { event }
        })}
      >
        <rect
          x={textX-textWidth/2-textPadding*2}
          y={textY-fontSize}
          width={textWidth+textPadding*4}
          height={fontSize+textPadding*4}
          fill="white"
          stroke="lightgray"
          strokeWidth={1}
        />
        <text
          x={textX-textWidth/2}
          y={textY+textPadding}
          fontSize={fontSize}
        >
          { event }
        </text>
      </g>
    }
  </g>
}

export default Transition