import r from 'rithmic'

const schema = {
  id: 'graph',
  data: {
    nodes: [],
    edges: []
  },
  states: [],
  transitions: [],
  subscriptions: [
    {
      event: 'startGraph',
      method: 'publishData'
    },
    {
      event: 'createNode',
      method: 'createNode'
    },
    {
      event: 'updateNode',
      method: 'updateNode'
    }
  ],
  methods: {
    publishData({ data }){
      return {
        send: {
          event: 'updatedGraph',
          payload: data
        }
      }
    },
    updateNode({ data, payload }){
      const node = data.nodes.find(({ id }) => id === payload.id)
      node.x = payload.x
      node.y = payload.y
      node.width = payload.width
      node.height = payload.height
      return {
        data,
        send: {
          event: 'updatedGraph',
          payload: data
        }
      }
    },
    createNode({ data, payload: node }){
      data.nodes.push(node)
      return {
        data,
        send: {
          event: 'createdNode',
          payload: node
        }
      }
    },
    // addEdge({ data, payload: { nodeId, x, y } }){
    //   data.edges.push({
    //     source: nodeId,
    //     points: [
    //       { x, y },
    //       { x, y }
    //     ]
    //   })
    //   data.selectedEdge = data.edges.length
    //   return {
    //     data,
    //     send: 'addedEdge'
    //   }
    // },
    // editEdge({ data, payload }){
    //   console.log('edit edge')
    //   const edge = data.edges[data.selectedEdge]
    //   const point = edge.points.length - 1
    //   const prevPoint = point - 1
    //   const dx = Math.abs(edge.points[prevPoint].x - edge.points[point].x)
    //   const dy = Math.abs(edge.points[prevPoint].y - edge.points[point].y)
    //   const axis = dx > dy ? 'x' : 'y'
    //   edge[point][axis] = payload[axis]
    //   return {
    //     data,
    //     send: 'editedEdge'
    //   }
    // },
    // closeEdge({ data, payload: { nodeId } }){
    //   console.log('close edge')
    //   const edge = data.edges[data.selectedEdge]
    //   edge.target = nodeId
    //   return {
    //     data,
    //     send: 'closedEdge'
    //   }
    // },
    // snapEdge({ data, payload }){
    //   console.log('snap tqa')
    //   const { panel } = payload
    //   const edge = data.edges[data.selectedEdge]
    //   const axis = panel === 'top' || panel === 'bottom' ? 'y' : 'x'
    //   edge.points[edge.points.length - 1][axis] = payload[axis]
    //   edge.points[edge.points.length - 2][axis] = payload[axis]
    //   return {
    //     data
    //   }
    // }
  }
}

export default r.register(schema)