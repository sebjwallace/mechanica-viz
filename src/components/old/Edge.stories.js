import React, { useState } from 'react'
import Edge from './Edge.js'

export default { title: 'Edge' }

export const node = () => React.createElement(() => {

  const [ state, setState ] = useState({
    sourceX: 50,
    sourceY: 50,
    targetX: 200,
    targetY: 200
  })

  return <div>
    <svg width="500" height="500">
      {/* <Edge
        { ...state }
      /> */}
    </svg>
  </div>

})