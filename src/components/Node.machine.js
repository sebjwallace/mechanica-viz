import r from 'rithmic'

const schema = {
  id: 'node',
  tags: ['node'],
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
      id: 'selected.junction'
    },
    {
      id: 'selected.move'
    },
    {
      id: 'selected.moveCP'
    },
    {
      id: 'idle.multiselect'
    },
    {
      id: 'selected.multiselect'
    },
    {
      id: 'selected.multiselect.move'
    },
    {
      id: 'selected.multiselect.junction'
    }
  ],
  transitions: [
    {
      event: 'nodeMouseDown',
      source: 'idle',
      target: 'selected.move',
      guard: 'isSelectable'
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
      target: 'selected.junction',
      guard: 'isSelectable'
    },
    {
      event: 'mouseMove',
      source: 'selected.junction',
      target: 'selected.move',
      method: 'move'
    },
    {
      event: 'nodeMouseUp',
      source: 'selected.junction',
      target: 'idle'
    },
    {
      event: 'deselectAllNodes',
      source: 'selected.idle',
      target: 'idle',
      guard: 'isDeselectable'
    },
    {
      event: 'graphMouseDown',
      source: 'selected.idle',
      target: 'idle'
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
    },

    {
      event: 'multiselectOn',
      source: 'idle',
      target: 'idle.multiselect'
    },
    {
      event: 'multiselectOff',
      source: 'idle.multiselect',
      target: 'idle'
    },
    {
      event: 'nodeMouseDown',
      source: 'idle.multiselect',
      target: 'selected.multiselect.move',
      guard: 'isSelectable'
    },

    {
      event: 'multiselectOn',
      source: 'selected.idle',
      target: 'selected.multiselect'
    },
    {
      event: 'multiselectOff',
      source: 'selected.multiselect',
      target: 'selected.idle'
    },
    
    {
      event: 'nodeMouseDown',
      source: 'selected.multiselect',
      target: 'selected.multiselect.junction'
    },
    {
      event: 'mouseMove',
      source: 'selected.multiselect.junction',
      target: 'selected.multiselect.move',
      method: 'move'
    },
    {
      event: 'nodeMouseUp',
      source: 'selected.multiselect.junction',
      target: [
        'isSelectable',
        'idle.multiselect',
        'selected.multiselect'
      ]
    },
    {
      event: 'mouseMove',
      source: 'selected.multiselect.move',
      target: 'selected.multiselect.move',
      method: 'move'
    },
    {
      event: 'nodeMouseUp',
      source: 'selected.multiselect.move',
      target: 'selected.multiselect'
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
        addTag: 'node'+payload.id
      }
    },
    destructor({ data, payload }){
      return {
        destruct: data.id === payload.id
      }
    },
    isSelectable({ data, payload }){
      return data.id === payload.id
    },
    isDeselectable({ data, payload }){
      return data.id !== payload.id
    },
    move({ data, payload }){
      const { movementX, movementY } = payload
      const node = data
      node.x += movementX
      node.y += movementY
      return {
        data
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