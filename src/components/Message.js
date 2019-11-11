import React, { useState } from 'react'

export default ({ source, target, event, targetEdgeCount, isActive: propActive }) => {

  const [ state, setState ] = useState({ active: true })

  if(state.active === false && propActive === false){
    setState({ active: true })
  }

  if(state.active === true && propActive === true){
    setTimeout(() => {
      setState({ active: false })
    }, 500)
  }

  const isActive = state.active === true && propActive === true
  const key = source.id+target.id
  const isLeft = source.x > target.x
  const isRight = target.x > source.x
  const al = 7
  const aw = 4

  let sx, sy
  let ix
  let tx, ty

  if(isRight){
    sx = source.x + source.width
    sy = source.y + source.height / 2
    tx = target.x
    ty = target.y + targetEdgeCount * 10
    ix = sx + ((tx - sx) / 2)
  }
  else if(isLeft){
    sx = source.x
    sy = source.y + source.height / 2
    tx = target.x + target.width
    ty = target.y + targetEdgeCount * 10
    ix = sx + ((tx - sx) / 2)
  }

  let arrowPath

  if(isRight){
    arrowPath = `${tx-al},${ty-aw} ${tx},${ty} ${tx-al},${ty+aw}`
  }
  else if(isLeft){
    arrowPath = `${tx+al},${ty-aw} ${tx},${ty} ${tx+al},${ty+aw}`
  }

  const fontSize = 10
  const txtw = calcTextWidth(event, fontSize)
  const txtx = sx + ((ix - sx) / 2) - (txtw / 2)
  const txty = sy + 4

  const strokeColor = isActive ? 'black' : 'lightgray'
  const textColor = isActive ? 'white' : 'black'
  const textBackgroundColor = isActive ? 'black' : 'white'

  return <g key={key}>
    <line
      x1={sx}
      y1={sy}
      x2={ix}
      y2={sy}
      stroke={strokeColor}
      className={key}
    />
    <line
      x1={ix}
      y1={sy}
      x2={ix}
      y2={ty}
      stroke={strokeColor}
      className={key}
    />
    <line
      x1={ix}
      y1={ty}
      x2={tx}
      y2={ty}
      stroke={strokeColor}
      className={key}
    />
    <polygon
      points={arrowPath}
      className={key}
      style={{
        fill: strokeColor
      }}
    />
    <rect
      width={txtw + 4}
      height={12}
      x={txtx - 2}
      y={txty - 10}
      style={{
        fill: textBackgroundColor,
        strokeWidth: 1,
        stroke: textBackgroundColor
      }}
    />
    <text
      x={txtx}
      y={txty}
      fontSize={10}
      style={{
        fill: textColor,
        cursor: 'pointer'
      }}
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