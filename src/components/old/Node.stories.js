import React, { useState } from 'react'
import Node from './Node.js'

export default { title: 'Node' }

export const node = () => React.createElement(() => {

  const [ state, setState ] = useState({
    x: 20,
    y: 20,
    width: 100,
    height: 50
  })

  return <div>
    <svg onMouseMove={state.mouseMoveHandler}>
      <Node
        x={state.x}
        y={state.y}
        width={state.width}
        height={state.height}
        onChange={(updates) => setState({
          ...state,
          ...updates
        })}
      />
    </svg>
  </div>

})