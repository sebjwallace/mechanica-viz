import React, { useState } from 'react'

import Node from './Node.js'
import Edge from './Edge.js'
import { portPosition } from '../utils/positioning'

export default () => {

  const [ state, setState ] = useState({
    nodes: [
      {
        id: 'node1',
        x: 20,
        y: 20,
        width: 100,
        height: 50
      },
      {
        id: 'node2',
        x: 200,
        y: 100,
        width: 100,
        height: 50
      }
    ],
    edges: [
      {
        source: {
          id: 'node1',
          panel: 'right',
          port: 1
        },
        target: {
          id: 'node2',
          panel: 'left',
          port: 1
        },
        points: [
          { x: 150, y: 35 },
          { x: 150, y: 100 }
        ]
      }
    ]
  })

  return <div>
    <svg
      width="500"
      height="500"
    >
      {
        state.nodes.map((node, i) => <Node
          x={node.x}
          y={node.y}
          width={node.width}
          height={node.height}
          onChange={(updates) => {
            state.nodes[i] = {
              ...state.nodes[i],
              ...updates
            }
            setState({ ...state })
          }}
        />)
      }
      {
        state.edges.map(({ source, target, points }, i) => {
          const sourcePos = portPosition({
            side: source.panel,
            i: source.port,
            ...state.nodes.find(node => node.id === source.id)
          })
          const targetPos = portPosition({
            side: target.panel,
            i: target.port,
            ...state.nodes.find(node => node.id === target.id)
          })
          return <Edge
            sourceX={sourcePos.x}
            sourceY={sourcePos.y}
            targetX={targetPos.x}
            targetY={targetPos.y}
            points={points}
            onChange={(updates) => {
              state.edges[i] = {
                ...state.edges[i],
                ...updates
              }
              setState({ ...state })
            }}
          />
        })
      }
    </svg>
  </div>

}