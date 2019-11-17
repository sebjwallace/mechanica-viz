import React, { useState } from 'react'

import Node from './Node.js'
import Edge from './Edge.js'
import { portPosition } from '../utils/positioning'

export default () => {

  const [ state, setState ] = useState({
    node1: {
      x: 20,
      y: 20,
      width: 100,
      height: 50
    },
    node2: {
      x: 200,
      y: 100,
      width: 100,
      height: 50
    },
    edge: {
      source: {
        id: 'node1',
        port: ['right', 2]
      },
      target: {
        id: 'node2',
        port: ['left', 1]
      }
    }
  })

  const sourcePos = portPosition({
    side: state.edge.source.port[0],
    i: state.edge.source.port[1],
    ...state[state.edge.source.id]
  })

  const targetPos = portPosition({
    side: state.edge.target.port[0],
    i: state.edge.target.port[1],
    ...state[state.edge.target.id]
  })

  return <div>
    <svg
      width="500"
      height="500"
    >
      <Node
        x={state.node1.x}
        y={state.node1.y}
        width={state.node1.width}
        height={state.node1.height}
        onChange={(updates) => setState({
          ...state,
          node1: {
            ...state.node1,
            ...updates
          }
        })}
      />
      <Node
        x={state.node2.x}
        y={state.node2.y}
        width={state.node2.width}
        height={state.node2.height}
        onChange={(updates) => setState({
          ...state,
          node2: {
            ...state.node2,
            ...updates
          }
        })}
      />
      <Edge
        sourceX={sourcePos.x}
        sourceY={sourcePos.y}
        targetX={targetPos.x}
        targetY={targetPos.y}
      />
    </svg>
  </div>

}