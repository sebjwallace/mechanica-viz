import r from 'rithmic'

const schema = {
  id: 'model',
  data: {
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
    edges: [],
    selectedNode: 'node1',
    selectedNodeCP: null,
    selectedEdge: 0
  },
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'editNode'
    },
    {
      id: 'editEdge'
    },
    {
      id: 'editNodeCP'
    }
  ],
  transitions: [
    {
      event: 'nodeMouseDown',
      source: 'idle',
      target: 'editNode',
      method: 'selectNode'
    },
    {
      event: 'nodeMouseDown',
      source: 'editNode',
      target: 'editNode',
      method: 'selectNode'
    },
    {
      event: 'nodeMouseUp',
      source: 'editNode',
      target: 'idle'
    },
    {
      event: 'mouseMove',
      source: 'editNode',
      target: 'editNode',
      method: 'moveNode'
    },
    {
      event: 'mouseDown',
      source: 'idle',
      target: 'editNodeCP',
      method: 'selectNodeCP'
    },
    {
      event: 'mouseMove',
      source: 'editNodeCP',
      target: 'editNodeCP',
      method: 'moveNodeCP'
    },
    {
      event: 'mouseUp',
      source: 'editNodeCP',
      target: 'idle'
    }
  ],
  subscriptions: [
    {
      event: 'startGraph',
      method: 'publishData'
    }
  ],
  methods: {
    publishData({ data }){
      return {
        send: {
          event: 'updateGraph',
          payload: data
        }
      }
    },
    selectNode({ data, payload }){
      data.selectedNode = payload.id
      return {
        data,
        send: {
          event: 'updateGraph',
          payload: data
        }
      }
    },
    moveNode({ data, payload }){
      const { movementX, movementY } = payload
      const node = data.nodes.find(({ id }) => id === data.selectedNode)
      node.x += movementX
      node.y += movementY
      return {
        data,
        send: {
          event: 'updateGraph',
          payload: data
        }
      }
    },
    selectNodeCP({ data, payload }){
      data.selectNodeCP = payload.position
      return { data }
    },
    moveNodeCP({ data, payload }){
      const { movementX, movementY } = payload
      const node = data.nodes.find(({ id }) => id === data.selectedNode)
      if(data.selectNodeCP === 'TL'){
        node.x += movementX
        node.y += movementY
        node.width -= movementX
        node.height -= movementY
      }
      if(data.selectNodeCP === 'TR'){
        node.y += movementY
        node.width += movementX
        node.height -= movementY
      }
      if(data.selectNodeCP === 'BL'){
        node.x += movementX
        node.width -= movementX
        node.height += movementY
      }
      if(data.selectNodeCP === 'BR'){
        node.width += movementX
        node.height += movementY
      }
      return {
        data,
        send: {
          event: 'updateGraph',
          payload: data
        }
      }
    },
    addEdge({ data, payload: { nodeId, x, y } }){
      data.edges.push({
        source: nodeId,
        points: [
          { x, y },
          { x, y }
        ]
      })
      data.selectedEdge = data.edges.length
      return {
        data,
        send: 'addedEdge'
      }
    },
    editEdge({ data, payload }){
      console.log('edit edge')
      const edge = data.edges[data.selectedEdge]
      const point = edge.points.length - 1
      const prevPoint = point - 1
      const dx = Math.abs(edge.points[prevPoint].x - edge.points[point].x)
      const dy = Math.abs(edge.points[prevPoint].y - edge.points[point].y)
      const axis = dx > dy ? 'x' : 'y'
      edge[point][axis] = payload[axis]
      return {
        data,
        send: 'editedEdge'
      }
    },
    closeEdge({ data, payload: { nodeId } }){
      console.log('close edge')
      const edge = data.edges[data.selectedEdge]
      edge.target = nodeId
      return {
        data,
        send: 'closedEdge'
      }
    },
    snapEdge({ data, payload }){
      console.log('snap tqa')
      const { panel } = payload
      const edge = data.edges[data.selectedEdge]
      const axis = panel === 'top' || panel === 'bottom' ? 'y' : 'x'
      edge.points[edge.points.length - 1][axis] = payload[axis]
      edge.points[edge.points.length - 2][axis] = payload[axis]
      return {
        data
      }
    }
  }
}

export default r.create(schema)