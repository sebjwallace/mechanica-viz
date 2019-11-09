import React from 'react'

export default ({ source, target, event }) => {

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
    ty = target.y + target.height / 2
    ix = sx + ((tx - sx) / 2)
  }
  else if(isLeft){
    sx = source.x
    sy = source.y + source.height / 2
    tx = target.x + target.width
    ty = target.y + target.height / 2
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

  const key = source.id+target.id

  return <g key={key}>
    <line
      x1={sx}
      y1={sy}
      x2={ix}
      y2={sy}
      stroke='black'
    />
    <line
      x1={ix}
      y1={sy}
      x2={ix}
      y2={ty}
      stroke='black'
    />
    <line
      x1={ix}
      y1={ty}
      x2={tx}
      y2={ty}
      stroke='black'
    />
    <polygon
      points={arrowPath}
      style={{
        fill: 'black'
      }}
    />
    <rect
      width={txtw + 2}
      height={12}
      x={txtx - 2}
      y={txty - 10}
      style={{
        fill: '#f2f2f2',
        strokeWidth: 1,
        stroke: 'black'
      }}
    />
    <text
      x={txtx}
      y={txty}
      fontSize={10}
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