import React from 'react'

const height = 25
const textTopPadding = height / 2 + 5
const textLeftPadding = 5

export const State = ({ x, y, id }) => {

  const key = `${x}${y}${id}`
  const width = calcStateWidth(id)

  return <g key={key}>
    <rect
      width={width}
      height={height}
      x={x}
      y={y}
      style={{
        fill: 'white',
        strokeWidth: 2,
        stroke: 'grey'
      }}
    />
    <text
      x={x + textLeftPadding}
      y={y + textTopPadding}
      fontFamily='arial'
      fontSize={14}
    >
      { id }
    </text>
  </g>

}

export const calcStateWidth = function(id){
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = 'bold 14px arial'
  return ctx.measureText(id).width + textLeftPadding * 2
}