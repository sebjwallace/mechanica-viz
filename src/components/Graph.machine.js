import r from 'rithmic'

const schema = {
  id: 'graph',
  data: {
    nodes: [],
    edges: []
  },
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'drawEdge'
    }
  ],
  transitions: [
    {
      event: 'interfaceMouseDown',
      source: 'idle',
      target: 'drawEdge',
      method: 'createEdge'
    },
    {
      event: 'interfaceMouseDown',
      source: 'drawEdge',
      target: 'idle',
      method: 'closeEdge'
    }
  ],
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
    createEdge({ data, payload: { id, nativeEvent } }){
      const node = data.nodes.find(node => node.id === id)
      const { offsetX: x, offsetY: y } = nativeEvent
      const dx = x - node.x
      const dy = y - node.y
      const edge = {
        id: Math.random().toString(36).substring(2),
        source: node,
        sourceDx: dx,
        sourceDy: dy,
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
    closeEdge({ data, payload: { id, nativeEvent } }){
      const node = data.nodes.find(node => node.id === id)
      const { offsetX: x, offsetY: y } = nativeEvent
      const targetDx = x - node.x
      const targetDy = y - node.y
      return {
        send: {
          event: 'closeEdge',
          payload: { target: node, targetDx, targetDy }
        }
      }
    }
  }
}

export default r.register(schema)