import r from 'rithmic'

const schema = {
  id: 'node',
  data: {},
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'editNode'
    },
    {
      id: 'moveNode'
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
      event: 'graphMouseDown',
      source: 'editNode',
      target: 'idle',
      method: 'deselectNode'
    },
    {
      event: 'nodeMouseUp',
      source: 'moveNode',
      target: 'editNode'
    },
    {
      event: 'mouseMove',
      source: 'editNode',
      target: 'moveNode',
      method: 'moveNode'
    },
    {
      event: 'mouseMove',
      source: 'moveNode',
      target: 'moveNode',
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
    },
    {
      event: 'createdNode',
      method: 'constructor',
      create: true
    },
    {
      event: 'deletedNode',
      method: 'destructor',
      destroy: true
    }
  ],
  methods: {
    constructor({ payload }){
      return {
        data: payload,
        ref: 'node'+payload.id
      }
    },
    destructor({ data, payload }){
      return {
        destruct: data.id === payload.id
      }
    },
    selectNode({ data }){
      return {
        data: { ...data, selected: true }
      }
    },
    deselectNode({ data }){
      console.log('deselect')
      return {
        data: { ...data, selected: false }
      }
    },
    moveNode({ data, payload }){
      const { movementX, movementY } = payload
      const node = data
      node.x += movementX
      node.y += movementY
      return {
        data,
        send: {
          event: 'updateNode',
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
      const node = data
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
    }
  }
}

export default r.register(schema)