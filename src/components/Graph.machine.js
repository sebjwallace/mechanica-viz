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
    },
    {
      event: 'portMouseDown',
      method: 'createEdge'
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
    createEdge({ data, payload: { source, x, y } }){
      const edge = {
        id: Math.random().toString(36).substring(2),
        source,
        points: [
          { x, y },
          { x, y }
        ]
      }
      data.edges.push(edge)
      return {
        data,
        send: [
          { event: 'createdEdge', payload: edge },
          { event: 'updatedGraph', payload: data }
        ]
      }
    },
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