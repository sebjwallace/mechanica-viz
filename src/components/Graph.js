import React, { useState } from 'react'

import Node from './Node.js'
import Edge from './Edge.js'
import NewEdge from './NewEdge'
import { portPosition } from '../utils/positioning'

export default () => {

  const [ state, setState ] = useState({
    newEdge: false,
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
    edges: []
  })

  return <div>
    <svg
      width="500"
      height="500"
    >
      {
        state.newEdge && <NewEdge
          startX={state.newEdge.x}
          startY={state.newEdge.y}
          onChange={(points) => setState({
            ...state,
            newEdge: {
              ...state.newEdge,
              points
            }
          })}
        />
      }
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
          onPortMouseDown={({ x, y, side, i }) => {
            if(state.newEdge){
              const point = state.newEdge.points[state.newEdge.points.length-1]
              const dx = Math.abs(x - point.x)
              const dy = Math.abs(y - point.y)
              point.x = dx < dy ? x : point.x
              point.y = dy < dx ? y : point.y
              state.edges.push({
                source: state.newEdge,
                target: {
                  id: node.id,
                  panel: side,
                  port: i + 1
                },
                points: state.newEdge.points
              })
              setState({ ...state, newEdge: null })
            }
            else {
              setState({
                ...state,
                newEdge: {
                  id: node.id,
                  x, y,
                  panel: side,
                  port: i + 1
                }
              })
            }
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