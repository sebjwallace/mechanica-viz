import React from 'react'

export default ({
  event,
  source,
  target,
  statePositions,
  offsetLeftY,
  offsetRightY,
  offsetTargetX,
  offsetY
}) => {

  const { x: x1, y: y1, w: w1 } = statePositions[source]
  const { x: x2, y: y2, w: w2 } = statePositions[target]

  const toRight = x2 > x1
  const toLeft = x1 > x2
  const arrowL = 7
  const arrowW = 5
  const h = 25

  let px1, py1
  let px2, py2
  let offset

  if(toLeft){
    px1 = x1 + offsetLeftY * 4
    py1 = y1 + offsetY
    px2 = x2 + w2 - offsetTargetX * 7
    py2 = y2 + offsetY
    offset = -15 * offsetLeftY
  }
  else if(toRight) {
    px1 = x1 + w1 - offsetRightY * 4
    py1 = y1 + h + offsetY
    px2 = x2 + offsetTargetX * 7
    py2 = y2 + h + offsetY
    offset = 15 * offsetRightY
  }

  let arrowPath

  if(toLeft){
    arrowPath = `${px2-arrowW},${py2-arrowL} ${px2+arrowW},${py2-arrowL} ${px2},${py2}`
  }
  else if(toRight){
    arrowPath = `${px2-arrowW},${py2+arrowL} ${px2+arrowW},${py2+arrowL} ${px2},${py2}`
  }

  const fontSize = 10
  const tw = calcTextWidth(event, fontSize)
  const tx = px1 + ((px2 - px1) / 2) - (tw / 2)
  const ty = py1 + offset + 4

  const key = source+target+event

  return <g key={key}>
    <line
      x1={px1}
      y1={py1}
      x2={px1}
      y2={py1+offset}
      stroke='black'
    />
    <line
      x1={px1}
      y1={py1+offset}
      x2={px2}
      y2={py2+offset}
      stroke='black'
    />
    <line
      x1={px2}
      y1={py2+offset}
      x2={px2}
      y2={py2}
      stroke='black'
    />
    <polygon
      points={arrowPath}
      style={{
        fill: 'black'
      }}
    />
    <rect
      width={tw+2}
      height={12}
      x={tx-2}
      y={ty-10}
      style={{
        fill: '#f2f2f2',
        strokeWidth: 1,
        stroke: 'black'
      }}
    />
    <text
      x={tx}
      y={ty}
      fontSize={fontSize}
    >
      { event }
    </text>
  </g>

}

const calcTextWidth = (text, fontSize) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = `bold ${fontSize}px arial`
  return ctx.measureText(text).width
}