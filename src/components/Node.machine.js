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
      id: 'selected.idle'
    },
    {
      id: 'selected.move'
    },
    {
      id: 'selected.moveCP'
    }
  ],
  transitions: [
    {
      event: 'nodeMouseDown',
      source: 'idle',
      target: 'selected.move',
      method: 'select'
    },
    {
      event: 'mouseMove',
      source: 'selected.move',
      target: 'selected.move',
      method: 'move'
    },
    {
      event: 'mouseUp',
      source: 'selected.move',
      target: 'selected.idle'
    },
    {
      event: 'nodeMouseDown',
      source: 'selected.idle',
      target: 'selected.move'
    },
    {
      event: 'graphMouseDown',
      source: 'selected.idle',
      target: 'idle',
      method: 'deselect'
    },
    {
      event: 'nodeCpMouseDown',
      source: 'selected.idle',
      target: 'selected.moveCP',
      method: 'selectCP'
    },
    {
      event: 'mouseMove',
      source: 'selected.moveCP',
      target: 'selected.moveCP',
      method: 'moveCP'
    },
    {
      event: 'mouseUp',
      source: 'selected.moveCP',
      target: 'selected.idle'
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
    select({ data }){
      return {
        data: { ...data, selected: true }
      }
    },
    deselect({ data }){
      return {
        data: { ...data, selected: false }
      }
    },
    move({ data, payload }){
      const { movementX, movementY } = payload
      const node = data
      node.x += movementX
      node.y += movementY
      return {
        data,
        // send: {
        //   event: 'updateNode',
        //   payload: data
        // }
      }
    },
    selectCP({ data, payload }){
      data.selectNodeCP = payload.position
      return { data }
    },
    moveCP({ data, payload }){
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