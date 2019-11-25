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
      event: 'portMouseDown',
      source: 'idle',
      target: 'drawEdge',
      method: 'createEdge'
    },
    {
      event: 'portMouseDown',
      source: 'drawEdge',
      target: 'idle'
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
    createEdge({ data, payload: { source, x, y } }){
      const edge = {
        id: Math.random().toString(36).substring(2),
        source,
        points: [
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
    }
  }
}

export default r.register(schema)