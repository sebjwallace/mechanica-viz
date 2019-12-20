import React, { useState, useEffect } from 'react'
import ELK from 'elkjs/lib/elk.bundled.js'

const elk = new ELK()

export default ({ states = [], transitions = [] }) => {

  const [ state, setState ] = useState({ graph: '' })

  useEffect(() => {
    const graph = {
      id: "root",
      layoutOptions: { 'elk.algorithm': 'layered' },
      children: states.map(({ id }) => ({
        id, width: 50, height: 20
      })),
      edges: transitions.map(({ source, target }) => ({
        id: `${source} ${target}`,
        sources: [source],
        targets: [target]
      }))
    }

    elk.layout(graph).then(g => setState({ graph: g }))
  }, [])

  if(!state.graph) return ''

  const { width, height, children: nodes, edges } = state.graph

  return <div>
    <svg width={width * 2} height={height * 2}>
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
      {
        nodes.map(({ id, x, y, width, height }) => <g>
          <rect
            x={x * 2}
            y={y * 2}
            width={width * 2}
            height={height * 2}
            fill="gray"
          />
          <text
            x={x * 2 + width}
            y={y * 2 + height}
            fill="black"
          >
            { id }
          </text>
        </g>)
      }
      {
        edges.map(({ sections }) => sections.map(({ startPoint, endPoint, bendPoints = [] }) => {
          const spx = startPoint.x * 2
          const spy = startPoint.y * 2
          const epx = endPoint.x * 2
          const epy = endPoint.y * 2
          const bps = bendPoints.map(({ x, y }) => ` L ${x * 2} ${y * 2}`).join('')
          const path = `M ${spx} ${spy} ${bps} L ${epx} ${epy}`

          return <path
            d={path}
            markerEnd={"url(#head)"}
            stroke="gray"
            fill="none"
          />
        }))
      }
    </svg>
  </div>

}