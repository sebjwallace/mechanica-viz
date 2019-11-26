import React from 'react'
import Graph from './Graph'

import './Graph.machine'
import './Node.machine'
import './Edge.machine'

export default { title: 'Graph' }

export const graph = () => React.createElement(() => {

  return <Graph create="graph"/>

})