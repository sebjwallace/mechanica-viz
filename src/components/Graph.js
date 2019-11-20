import React, { useState, useEffect } from 'react'
import r from 'rithmic'

import Node from './Node.js'
import Edge from './Edge.js'

import machine from './Graph.machine'

export default () => {

  useEffect(() => {
    r.subscribe({
      event: 'updateGraph',
      callback: ({ payload }) => {
        setState({ ...payload })
      }
    })
    r.send('startGraph')
  }, [])

  const [ state, setState ] = useState({})

  return <div>
    <svg
      width="500"
      height="500"
      onMouseMove={e => r.send('mouseMove', e)}
      onMouseUp={e => r.send('mouseUp', e)}
    >
      {
        state.nodes && state.nodes.map((node) => <Node
          id={node.id}
          x={node.x}
          y={node.y}
          width={node.width}
          height={node.height}
          selected={state.selectedNode === node.id}
        />)
      }
      {
        // state.edges.map(({ source, target, points }, i) => {
        //   const sourcePos = portPosition({
        //     side: source.panel,
        //     i: source.port,
        //     ...state.nodes.find(node => node.id === source.id)
        //   })
        //   const targetPos = portPosition({
        //     side: target.panel,
        //     i: target.port,
        //     ...state.nodes.find(node => node.id === target.id)
        //   })
        //   return <Edge
        //     sourceX={sourcePos.x}
        //     sourceY={sourcePos.y}
        //     targetX={targetPos.x}
        //     targetY={targetPos.y}
        //     points={points}
        //   />
        // })
      }
    </svg>
  </div>

}