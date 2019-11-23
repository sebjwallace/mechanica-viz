import React, { useEffect } from 'react'
import r from 'rithmic'
import Attach from './Attach'

import Node from './Node.js'

const Graph = ({ nodes }) => {

  useEffect(() => {
    r.send('startGraph')
    r.send('createNode', { id: 1, x: 0, y: 0, width: 50, height: 50 })
  }, [])

  return <div>
    <svg
      width="500"
      height="500"
      onMouseDown={e => r.send('graphMouseDown', e)}
      onMouseMove={e => r.send('mouseMove', e)}
      onMouseUp={e => r.send('mouseUp', e)}
    >
      {
        nodes && nodes.map((node) => <Node
          key={node.id}
          id={'node'+node.id}
        />)
      }
    </svg>
  </div>

}

export default Attach(Graph)