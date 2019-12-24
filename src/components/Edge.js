import React from 'react'

export default ({ sx, sy, tx, ty, tr, label }) => {

  const xr = tx - sx
  const yr = ty - sy
  const dist = Math.sqrt(xr**2 + yr**2)
  const ratio = (1 - (tr / dist)) * 0.97
  const endx = sx + (xr * ratio)
  const endy = sy + (yr * ratio)

  return <g>
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
    <line
      x1={sx}
      y1={sy}
      x2={endx}
      y2={endy}
      stroke="darkgray"
      markerEnd={"url(#head)"}
    />
  </g>

}