import r from 'rithmic'

export default r.register({
  id: 'state',
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
      event: 'stateMouseDown',
      source: 'idle',
      target: 'selected.move'
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
      event: 'stateMouseDown',
      source: 'selected.idle',
      target: 'selected.move'
    },
    {
      event: 'deselectAllNodes',
      source: 'selected.idle',
      target: 'idle'
    },
    {
      event: 'mouseDown',
      source: 'selected.idle',
      target: 'idle'
    },
    {
      event: 'stateCpMouseDown',
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
      event: 'updatedModel',
      method: 'update'
    }
  ],
  methods: {
    constructor(){
      return {
        send: {
          event: 'updateModel'
        }
      }
    },
    update({ data, payload }){
      data.model = payload
      return {
        data
      }
    },
    move({ data, payload }){
      const { movementX, movementY } = payload
      const state = data.model.schema.states[data.index]
      state.view.x += movementX
      state.view.y += movementY
      return {
        send: [
          {
            event: 'updateModel',
            payload: data.model
          },
          {
            event: 'updatedState',
            payload: { id: data.index }
          }
        ]
      }
    },
    selectCP({ data, payload }){
      data.selectedCp = payload.position
      return { data }
    },
    moveCP({ data, payload }){
      const { movementX, movementY } = payload
      const { view } = data.model.schema.states[data.index]
      if(data.selectedCp === 'TL'){
        view.x += movementX
        view.y += movementY
        view.width -= movementX
        view.height -= movementY
      }
      if(data.selectedCp === 'TR'){
        view.y += movementY
        view.width += movementX
        view.height -= movementY
      }
      if(data.selectedCp === 'BL'){
        view.x += movementX
        view.width -= movementX
        view.height += movementY
      }
      if(data.selectedCp === 'BR'){
        view.width += movementX
        view.height += movementY
      }
      return {
        data,
        send: [
          {
            event: 'updateModel',
            payload: data.model
          },
          {
            event: 'updatedState',
            payload: { id: data.index }
          }
        ]
      }
    }
  }
})