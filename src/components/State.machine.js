import r from 'rithmic'

export default r.register({
  id: 'state',
  data: {
    id: '',
    view: {
      x: 20,
      y: 20,
      width: 50,
      height: 50
    }
  },
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
    },
    {
      event: 'del',
      source: 'selected.idle',
      target: 'idle',
      method: 'remove'
    }
  ],
  methods: {
    constructor({ data }){
      data.id = Math.random().toString().slice(0,4)
      return {
        data
      }
    },
    move({ data, payload }){
      const { movementX, movementY } = payload
      const before = { ...data.view }
      data.view.x += movementX
      data.view.y += movementY
      return {
        data,
        send: {
          event: 'stateMovedScaled',
          payload: { before, after: { ...data.view } }
        }
      }
    },
    selectCP({ data, payload }){
      data.selectedCp = payload.position
      return { data }
    },
    moveCP({ data, payload }){
      const { movementX, movementY } = payload
      const { view } = data
      const prev = { ...view }
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
        send: {
          event: 'stateMovedScaled',
          payload: { before: prev, after: view }
        }
      }
    },
    remove(){
      return {
        delete: true
      }
    }
  }
})